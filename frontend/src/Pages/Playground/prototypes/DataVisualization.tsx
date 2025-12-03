import React from 'react';

const DataVisualization: React.FC = () => {
  return (
    <div style={{ padding: 'var(--space-8)' }}>
      <h2 style={{
        fontSize: 'var(--text-2xl)',
        fontWeight: 600,
        marginBottom: 'var(--space-4)',
        color: 'var(--text-primary)'
      }}>
        Data Visualization Prototype
      </h2>
      <p style={{
        color: 'var(--text-secondary)',
        marginBottom: 'var(--space-6)'
      }}>
        Experiment with charts, graphs, and data visualization concepts.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 'var(--space-4)',
        marginTop: 'var(--space-6)'
      }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              padding: 'var(--space-4)',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-primary)',
              textAlign: 'center'
            }}
          >
            <div style={{
              width: '100%',
              height: '120px',
              background: 'var(--accent-gradient)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-3)',
              opacity: 0.7
            }} />
            <p style={{ color: 'var(--text-primary)', fontSize: 'var(--text-sm)' }}>
              Chart {i}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataVisualization;
