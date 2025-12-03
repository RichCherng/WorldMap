import React from 'react';

const ExamplePrototype: React.FC = () => {
  return (
    <div style={{ padding: 'var(--space-8)' }}>
      <h2 style={{
        fontSize: 'var(--text-2xl)',
        fontWeight: 600,
        marginBottom: 'var(--space-4)',
        color: 'var(--text-primary)'
      }}>
        Example Prototype
      </h2>
      <p style={{
        color: 'var(--text-secondary)',
        marginBottom: 'var(--space-4)'
      }}>
        This is a sample prototype component. Replace this with your own experiments.
      </p>
      <div style={{
        padding: 'var(--space-6)',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-primary)'
      }}>
        <p style={{ color: 'var(--text-primary)' }}>
          Each prototype is isolated and can have its own state, components, and logic.
        </p>
      </div>
    </div>
  );
};

export default ExamplePrototype;
