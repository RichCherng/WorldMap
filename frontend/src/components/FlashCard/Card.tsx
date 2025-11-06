import { ReactNode } from "react";
import './FlashCard.css';
import { motion } from 'motion/react';

export interface CardDimensions {
    width: number;
    height: number;
}

export interface CardData {
    id: number;
    front: ReactNode
    back: ReactNode;
}

export interface CardProps {
    // cardDimensions?: { width: number; height: number };
    onClick?: () => void;
    card: CardData;
    isFlipped: boolean;
    dimensions: CardDimensions;
    animate: any;
    animationConfig: { stiffness: number; damping: number };
}


export default function Card({onClick, card, isFlipped, dimensions, animate, animationConfig}: CardProps) {
    return (
        <motion.div
            className="card"
            onClick={onClick}
            animate={animate}
            initial={false}
            transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping
            }}
            style={{
                width: dimensions.width,
                height: dimensions.height
            }}
            > 
            {isFlipped ? card.back : card.front}
            </motion.div>
    )
}   