import './FlashCard.css';
import CardStack from './CardStack';
import { CardData } from './Card';

/** https://reactbits.dev/components/stack */


interface FlashCardProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: { width: number; height: number };
  sendToBackOnClick?: boolean;
  cardsData?: CardData[];
  animationConfig?: { stiffness: number; damping: number };
}

export default function FlashCard({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 208, height: 208 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false
}: FlashCardProps) {

  const cards = cardsData.length
      ? cardsData : []

    return (
          <CardStack
            randomRotation={randomRotation}
            sensitivity={sensitivity}
            cardDimensions={cardDimensions}
            sendToBackOnClick={sendToBackOnClick}
            cardsData={cards}
            animationConfig={animationConfig}
            />
          )
}
