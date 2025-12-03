import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { prototypes } from './prototypes';
import './Playground.css';

const PrototypeSwitcher: React.FC = () => {
  const { prototypeId } = useParams<{ prototypeId: string }>();

  return (
    <aside className="prototype-switcher">
      <div className="switcher-header">
        <h2>Prototypes</h2>
      </div>
      <nav className="switcher-list">
        {prototypes.map((prototype) => (
          <Link
            key={prototype.id}
            to={`/playground/${prototype.id}`}
            className={`switcher-item ${prototypeId === prototype.id ? 'active' : ''}`}
          >
            <div className="switcher-item-title">{prototype.title}</div>
            {prototype.description && (
              <div className="switcher-item-description">{prototype.description}</div>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default PrototypeSwitcher;
