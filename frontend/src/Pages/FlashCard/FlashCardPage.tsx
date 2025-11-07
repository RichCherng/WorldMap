import React, { useEffect } from 'react';
import './FlashCardPage.css';
import Stack from '../../components/Stack';
import CircularGallery from '../../components/CircularGallery';
import FlashCard from '../../components/FlashCard/FlashCard';
import { CardData } from '../../components/FlashCard/Card';
import ChineseCard, { ChineseCardData } from '../../components/FlashCard/Language/ChineseCard';

const FlashCardPage: React.FC = () => {
  useEffect(() => {
    // Add class to body to enable scrolling when FlashCard is mounted
    document.body.classList.add('flashcard-page-active');
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.classList.add('flashcard-page-active');
    }
    const containerElement = document.querySelector('.container');
    if (containerElement) {
      containerElement.classList.add('flashcard-page-active');
    }

    // Cleanup function to remove class when component unmounts
    return () => {
      document.body.classList.remove('flashcard-page-active');
      if (rootElement) {
        rootElement.classList.remove('flashcard-page-active');
      }
      if (containerElement) {
        containerElement.classList.remove('flashcard-page-active');
      }
    };
  }, []);

  return (
    <div id="flashcard-scrollable-container">
      <div id="flashcard-content">
        <h1 id="flashcard-page-title">Interactive Flash Cards</h1>
        <div id="flashcard-stack-section">
          <h2 id="flashcard-section-title">Study Dev</h2>
          <p id="flashcard-section-description">Drag the cards around to interact with them</p>
          <ChineseCardStack />
        </div>
        <div id="flashcard-stack-section">
          <h2 id="flashcard-section-title">Card Stack 2</h2>
          <p id="flashcard-section-description">Drag the cards around to interact with them</p>
          <SampleCardStack />
        </div>
        <div id="flashcard-gallery-section">
          <h2 id="flashcard-section-title">Card Gallery</h2>
          <p id="flashcard-section-description">Scroll through the circular gallery</p>
          <CardGallery />
        </div>
        
        {/* Add extra content to ensure scrolling is needed */}
        <div id="flashcard-extra-content">
          <h2 id="flashcard-section-title">More Content</h2>
          <p id="flashcard-section-description">This section demonstrates scrolling functionality</p>
          <div style={{ height: '400px', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '1rem', padding: '2rem', margin: '2rem 0' }}>
            <h3>Scrollable Content Area</h3>
            <p>This area is here to ensure the page has enough content to require scrolling.</p>
            <p>You should be able to scroll up and down to see all the content on this page.</p>
            <p>The page includes:</p>
            <ul>
              <li>Interactive Card Stack</li>
              <li>Circular Gallery</li>
              <li>This additional content section</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};


const CardGallery = () => {
  return (
    <div id="flashcard-gallery-wrapper">
      <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02}/>
    </div>
  );
};


const ChineseCardStack: React.FC = () => {
  const words: ChineseCardData[] = [
          { id: 1, chineseWord: '你好', englishWord: 'Hello', pinyin: 'Nǐ hǎo', img: 'https://i.pinimg.com/736x/82/42/75/824275fa74fdff9a946834a52e38ff6c.jpg' },
          { id: 2, chineseWord: '谢谢', englishWord: 'Thank you', pinyin: 'Xièxiè'},
          { id: 3, chineseWord: '再见', englishWord: 'Goodbye', pinyin: 'Zàijiàn'},
          { id: 4, chineseWord: '请', englishWord: 'Please', pinyin: 'Qǐng',  },
          { id: 5, chineseWord: '我', englishWord: 'I, me', pinyin: 'Wǒ' },
        ]

  const cards: CardData[] = words.map(w => (ChineseCard(w) as CardData));

  return (
    <div id="flashcard-stack-wrapper">
      {
        <FlashCard 
          randomRotation={true}
          sensitivity={180}
          sendToBackOnClick={false}
          cardDimensions={{ width: 250, height: 250 }}
          cardsData={cards}/>
      }
    </div>
  );
}


const SampleCardStack: React.FC = () => {
  const images = [
          { id: 1, img: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format', img2: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format'},
          { id: 2, img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format', img2: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format'},
          { id: 3, img: 'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format', img2: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format'},
          { id: 4, img: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format', img2: 'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format'}
        ]

  const cards = images.map(c => ({ id: c.id, front: <img src={c.img} alt={`card-${c.id}`} className="card-image" />, back: <img src={c.img2} alt={`card-${c.id}-flipped`} className="card-image" />}))

  return (
    <div id="flashcard-stack-wrapper">
      {
        <FlashCard 
          randomRotation={true}
          sensitivity={180}
          sendToBackOnClick={false}
          cardDimensions={{ width: 200, height: 200 }}
          cardsData={cards}/>
      }
    </div>
  );
}

export default FlashCardPage;