import React, { Suspense } from 'react';
import { Outlet, Navigate, useParams } from 'react-router-dom';
import PrototypeSwitcher from './PrototypeSwitcher';
import { prototypes } from './prototypes';
import './Playground.css';

const PlaygroundPage: React.FC = () => {
  return (
    <div className="playground-container">
      <PrototypeSwitcher />
      <main className="playground-content">
        <Suspense fallback={<div className="loading">Loading prototype...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export const PlaygroundRedirect: React.FC = () => {
  if (prototypes.length === 0) {
    return (
      <div className="empty-state">
        <h2>No Prototypes</h2>
        <p>Add prototypes to the config array to get started.</p>
      </div>
    );
  }
  return <Navigate to={`/playground/${prototypes[0].id}`} replace />;
};

export default PlaygroundPage;
