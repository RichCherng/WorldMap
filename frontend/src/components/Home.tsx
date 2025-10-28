import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const styles = {
  todoCard: {
    marginTop: '20px'
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  addButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  emptyMessage: {
    color: '#666',
    fontStyle: 'italic' as const
  },
  todoList: {
    listStyle: 'none',
    padding: 0
  },
  todoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    marginBottom: '8px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    border: '1px solid #ddd'
  },
  checkbox: {
    cursor: 'pointer',
    width: '18px',
    height: '18px'
  },
  todoText: (completed: boolean) => ({
    flex: 1,
    textDecoration: completed ? 'line-through' : 'none',
    color: completed ? '#999' : '#333'
  }),
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  stats: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#666'
  }
};

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() === '') return;
    
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };
    
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div>
      <div className="card">
        <h2>Welcome to WorldMap (New Home)</h2>
        <p>
          This is the new home page. Use the navigation to explore the application —
          the interactive world map, API demos, and contact page.
        </p>
        <p>
          The previous landing page has been renamed to <strong>OldLandingPage</strong> and
          preserved in <code>frontend/src/components/OldLandingPage.tsx</code>.
        </p>
      </div>

      <div className="card" style={styles.todoCard}>
        <h2>My Todo List</h2>
        
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder="Enter a new task..."
            style={styles.input}
          />
          <button
            onClick={addTodo}
            style={styles.addButton}
          >
            Add
          </button>
        </div>

        {todos.length === 0 ? (
          <p style={styles.emptyMessage}>No tasks yet. Add one above!</p>
        ) : (
          <ul style={styles.todoList}>
            {todos.map(todo => (
              <li
                key={todo.id}
                style={styles.todoItem}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  style={styles.checkbox}
                />
                <span style={styles.todoText(todo.completed)}>
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        <p style={styles.stats}>
          Total: {todos.length} task{todos.length !== 1 ? 's' : ''} | 
          Completed: {todos.filter(t => t.completed).length}
        </p>
      </div>
    </div>
  );
};

export default Home;