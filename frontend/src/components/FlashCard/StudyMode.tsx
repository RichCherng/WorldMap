import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { ChineseCardData } from './Language/ChineseCard';
import './StudyMode.css';

interface StudyModeProps {
  words: ChineseCardData[];
}

const StudyMode: React.FC<StudyModeProps> = ({ words }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Motion values for drag
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

  // Reset when words change
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [words]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  const currentCard = words[currentIndex];
  const progress = words.length > 0 ? ((currentIndex + 1) / words.length) * 100 : 0;

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      x.set(0); // Reset drag position
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      x.set(0); // Reset drag position
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    setIsDragging(false);
    const swipeThreshold = 100; // Minimum drag distance to trigger navigation

    if (Math.abs(info.offset.x) > swipeThreshold) {
      if (info.offset.x > 0) {
        // Dragged right - go to previous
        handlePrevious();
      } else {
        // Dragged left - go to next
        handleNext();
      }
    } else {
      // Snap back to center if threshold not met
      x.set(0);
    }
  };

  const handleCardClick = () => {
    // Don't flip if user was dragging
    if (isDragging) return;

    if (clickTimeoutRef.current) {
      // Double click detected - flip the card
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      handleFlip();
    } else {
      // Single click - wait to see if double click follows
      clickTimeoutRef.current = setTimeout(() => {
        clickTimeoutRef.current = null;
        // Do nothing on single click
      }, 300);
    }
  };

  const handleFlip = async () => {
    const newFlippedState = !isFlipped;

    // Flip the card with smooth 180-degree rotation
    setIsFlipped(newFlippedState);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleFlip();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, isFlipped]);

  if (words.length === 0) {
    return (
      <div className="study-mode-container">
        <h1 className="study-mode-title">Study Mode</h1>
        <div className="study-mode-empty">
          <p>No cards available. Add some vocabulary to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="study-mode-container">
      <h1 className="study-mode-title">Study Mode</h1>

      <div className="study-mode-content">
        {/* Navigation Arrow - Left */}
        <button
          className="study-mode-nav-arrow study-mode-nav-left"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          aria-label="Previous card"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Card */}
        <motion.div
          className={`study-mode-card ${isFlipped ? 'flipped' : ''}`}
          style={{ x, rotate, opacity }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.7}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onClick={handleCardClick}
        >
          <div className="study-mode-card-inner">
            {/* Front - Chinese */}
            <div className="study-mode-card-face study-mode-card-front">
              {currentCard.img && (
                <img
                  src={currentCard.img}
                  alt={currentCard.chineseWord}
                  className="study-mode-card-image"
                />
              )}
              <h2 className="study-mode-chinese">{currentCard.chineseWord}</h2>
            </div>

            {/* Back - English + Pinyin */}
            <div className="study-mode-card-face study-mode-card-back">
              <p className="study-mode-pinyin">{currentCard.pinyin}</p>
              <h2 className="study-mode-english">{currentCard.englishWord}</h2>
              {currentCard.exampleUsage && (
                <div className="study-mode-example">
                  <p className="study-mode-example-text">{currentCard.exampleUsage}</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Navigation Arrow - Right */}
        <button
          className="study-mode-nav-arrow study-mode-nav-right"
          onClick={handleNext}
          disabled={currentIndex === words.length - 1}
          aria-label="Next card"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="study-mode-progress">
        <p className="study-mode-progress-text">
          {currentIndex + 1}/{words.length} cards
        </p>
        <div className="study-mode-progress-bar-container">
          <div
            className="study-mode-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default StudyMode;
