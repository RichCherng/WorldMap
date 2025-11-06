import { motion, useMotionValue, useTransform, useAnimation } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import './FlashCard.css';
import CardStack from './CardStack';

/** https://reactbits.dev/components/stack */


interface FlashCardProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: { width: number; height: number };
  sendToBackOnClick?: boolean;
  cardsData?: { id: number; img: string, img2: string }[];
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
      ? cardsData
      : [
          { id: 1, img: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format', img2: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format'},
          { id: 2, img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format', img2: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format'},
          { id: 3, img: 'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format', img2: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format'},
          { id: 4, img: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format', img2: 'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format'}
        ]

    return (
          <CardStack
            randomRotation={randomRotation}
            sensitivity={sensitivity}
            cardDimensions={cardDimensions}
            sendToBackOnClick={sendToBackOnClick}
            cardsData={cards.map(c => ({ id: c.id, front: <img src={c.img} alt={`card-${c.id}`} className="card-image" />, back: <img src={c.img2} alt={`card-${c.id}-flipped`} className="card-image" />}))}
            animationConfig={animationConfig}
            />
          )
}
