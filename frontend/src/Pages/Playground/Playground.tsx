import React, { useState } from 'react';
import { prototypes, Prototype } from './prototypes';
import './Playground.css';

interface PrototypeSwitcherProps {
  prototypes: Prototype[];
  activeIndex: number;
  onSwitch: (index: number) => void;
}

const PrototypeSwitcher: React.FC<PrototypeSwitcherProps> = ({
  prototypes,
  activeIndex,
  onSwitch,
}) => {
  return (
    <div className="prototype-switcher">
      {prototypes.map((proto, index) => (
        <button
          key={proto.id}
          className={`prototype-btn ${activeIndex === index ? 'active' : ''}`}
          onClick={() => onSwitch(index)}
        >
          {proto.name}
        </button>
      ))}
    </div>
  );
};

const Playground: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSwitch = (index: number) => {
    setActiveIndex(index);
  };

  const ActiveComponent = prototypes[activeIndex]?.component;

  return (
    <div id="playground">
      <PrototypeSwitcher
        prototypes={prototypes}
        activeIndex={activeIndex}
        onSwitch={handleSwitch}
      />
      <div id="playground-renderer">
        {ActiveComponent ? <ActiveComponent /> : null}
      </div>
    </div>
  );
};

export default Playground;
