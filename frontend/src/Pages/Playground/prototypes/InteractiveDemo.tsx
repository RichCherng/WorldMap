import React, { useState } from 'react';

const InteractiveDemo: React.FC = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <div style={{ padding: 'var(--space-8)' }}>
      <h2 style={{
        fontSize: 'var(--text-2xl)',
        fontWeight: 600,
        marginBottom: 'var(--space-4)',
        color: 'var(--text-primary)'
      }}>
        Interactive Demo
      </h2>
      <p style={{
        color: 'var(--text-secondary)',
        marginBottom: 'var(--space-6)'
      }}>
        Test interactive components and state management.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: '600px' }}>
        {/* Counter Section */}
        <div style={{
          padding: 'var(--space-6)',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-primary)'
        }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>Counter</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <button
              onClick={() => setCount(count - 1)}
              style={{
                padding: 'var(--space-2) var(--space-4)',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              -
            </button>
            <span style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              minWidth: '60px',
              textAlign: 'center'
            }}>
              {count}
            </span>
            <button
              onClick={() => setCount(count + 1)}
              style={{
                padding: 'var(--space-2) var(--space-4)',
                background: 'var(--accent-gradient)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              +
            </button>
            <button
              onClick={() => setCount(0)}
              style={{
                padding: 'var(--space-2) var(--space-4)',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Input Section */}
        <div style={{
          padding: 'var(--space-6)',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-primary)'
        }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>Text Input</h3>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type something..."
            style={{
              width: '100%',
              padding: 'var(--space-3)',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: 'var(--text-base)',
              marginBottom: 'var(--space-3)'
            }}
          />
          {text && (
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              You typed: <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{text}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;
