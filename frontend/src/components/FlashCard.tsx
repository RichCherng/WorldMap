import React from 'react';
import './FlashCard.css';
import Stack from './Stack';
import CircularGallery from './CircularGallery';

const FlashCard: React.FC = () => {
  // return (
  //   <div id="flashcard-container">
  //     <div id="flashcard-content-wrapper">
  //       <h1 id="flashcard-main-title">
  //         Flash Cards
  //       </h1>
        
  //       <div id="flashcard-intro-section">
  //         <div id="flashcard-intro-icon">🃏</div>
  //         <p id="flashcard-intro-text">
  //           Flash card functionality will be implemented here
  //         </p>
  //         <div id="flashcard-status-badge">
  //           <span>Ready for development</span>
  //         </div>
  //       </div>

  //       {/* Sample Flash Card Preview */}
  //       <div id="flashcard-preview-wrapper">
  //         <div id="flashcard-sample-card">
  //           <h3 id="flashcard-sample-title">Sample Flash Card</h3>
  //           <p id="flashcard-sample-question">Question: What is React?</p>
  //           <button id="flashcard-reveal-button">
  //             Reveal Answer
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  


  return (<div>
    <CardStack />
    <CardGallery />
  </div>);
};


const CardGallery = () => {
  return (
  <div style={{ height: '600px', position: 'relative' }}>
    <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02}/>
  </div>);
};

const CardStack = () => {
  const images = [
    { id: 1, img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format" },
    { id: 2, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format" },
    { id: 3, img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format" },
    { id: 4, img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format" }
  ];

  return (<Stack
      randomRotation={true}
      sensitivity={180}
      sendToBackOnClick={false}
      cardDimensions={{ width: 200, height: 200 }}
      cardsData={images}
    />);
};

export default FlashCard;