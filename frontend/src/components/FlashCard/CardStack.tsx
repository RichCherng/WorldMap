
import { useEffect, useRef, useState } from 'react';
import Card, { CardData, CardDimensions } from './Card';
import './FlashCard.css';
import { motion, useMotionValue, useTransform, useAnimation } from 'motion/react';

interface CardStackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: CardDimensions;
  sendToBackOnClick?: boolean;
  cardsData: CardData[];
  animationConfig?: { stiffness: number; damping: number };
}

export default function CardStack({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 208, height: 208 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false
}: CardStackProps) {

    const [cards, setCards] = useState(
      cardsData.length? cardsData: []
    );

    const sendToBack = (id: number) => {
    setCards(prev => {
      const newCards = [...prev];
      const index = newCards.findIndex(card => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div
      className="stack-container"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        perspective: 600
      }}
    >
      {cards.map((card, index) => {
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;
        return (
          <CardRotate 
            key={card.id} 
            onSendToBack={() => sendToBack(card.id)}
            onDoubleClick={() => {}}
            sensitivity={0}>
            {(isFlipped) => (
              <Card 
                onClick={ () => sendToBackOnClick && sendToBack(card.id)}
                card={card}
                isFlipped={isFlipped}
                dimensions={cardDimensions}
                animate={{
                  rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                  scale: 1 + index * 0.06 - cards.length * 0.06,
                  transformOrigin: '90% 90%'
                }}
                animationConfig={animationConfig}
              />
            )}
          </CardRotate>)
      })}
    </div>
  )
}

interface CardRotateProps {
  children: (isFlipped: boolean) => React.ReactNode;
  onSendToBack: () => void;
  onSingleClick?: () => void;
  onDoubleClick?: () => void;
  sensitivity: number;
}

function CardRotate({children, onSendToBack, onSingleClick, onDoubleClick, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const controls = useAnimation();
  const [isFlipped, setIsFlipped] = useState(false);

  // Initialize the animation controls with default rotation
  useEffect(() => {
    controls.set({ rotateY: 0 });
  }, [controls]);

  async function handleClick() {

    if (clickTimeoutRef.current) {
      // Double click detected
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      onDoubleClick?.();
      console.log('Double click detected');
      // Flip animation
      const newFlippedState = !isFlipped;
      setIsFlipped(newFlippedState);
      
      await controls.start({
        rotateY: newFlippedState ? 180 : 0,
        transition: {
          duration: 0.6,
          ease: "easeInOut"
        }
      });
    } else {
      // Single click - wait to see if double click follows
      clickTimeoutRef.current = setTimeout(() => {
        onSingleClick?.();
        clickTimeoutRef.current = null;
      }, 300);
    }
  }

  function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="card-rotate"
      style={{ x, y, rotateX }}
      animate={controls}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
    >
      {children(isFlipped)}
    </motion.div>
  );
}