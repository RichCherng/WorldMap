import React, { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './TodoTransitions.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface Announcement {
  id: number;
  date: string;
  title: string;
  message: string;
  icon: string;
  type: 'success' | 'warning' | 'update' | 'info';
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
    padding: 0,
    maxHeight: '300px',
    overflowY: 'auto' as const,
    position: 'relative' as const
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
    color: completed ? '#999' : '#333',
    transition: 'all 0.3s ease-in-out'
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
  },
  mapContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginTop: '20px'
  },
  mapWidget: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center'
  },
  mapTitle: {
    fontSize: '16px',
    fontWeight: 'bold' as const,
    marginBottom: '10px',
    color: '#333'
  },
  announcementsContainer: {
    marginBottom: '20px'
  },
  announcementsScroll: {
    maxHeight: '150px',
    overflowY: 'auto' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px',
    padding: '5px'
  },
  announcement: (type: string) => ({
    backgroundColor: type === 'success' ? '#4CAF50' : 
                     type === 'warning' ? '#ff9800' : 
                     type === 'update' ? '#2196F3' : '#4CAF50',
    color: 'white',
    padding: '15px 20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer'
  }),
  announcementHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
  },
  announcementIcon: {
    fontSize: '24px',
    minWidth: '24px'
  },
  announcementContent: {
    flex: 1
  },
  announcementHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  announcementTitle: {
    fontSize: '18px',
    fontWeight: 'bold' as const,
    margin: 0
  },
  announcementDate: {
    fontSize: '12px',
    opacity: 0.8,
    fontStyle: 'italic' as const
  },
  announcementText: {
    fontSize: '14px',
    opacity: 0.95,
    lineHeight: '1.5'
  },
  scrollHint: {
    textAlign: 'center' as const,
    fontSize: '12px',
    color: '#666',
    marginTop: '10px',
    fontStyle: 'italic' as const
  }
};

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [animatingIds, setAnimatingIds] = useState<Set<number>>(new Set());

  // Sample announcements data
  const [announcements] = useState<Announcement[]>([
    {
      id: 1,
      date: new Date().toISOString(),
      title: 'Welcome to WorldMap!',
      message: 'Your interactive travel planning companion is now live. Start adding your travel destinations!',
      icon: '🎉',
      type: 'success'
    },
    {
      id: 2,
      date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      title: 'New Feature: Todo List',
      message: 'Keep track of your travel tasks with our new integrated todo list feature.',
      icon: '✨',
      type: 'update'
    },
    {
      id: 3,
      date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      title: 'Google Maps Integration',
      message: 'Explore locations and plan routes directly from the home page using embedded maps.',
      icon: '🗺️',
      type: 'info'
    },
    {
      id: 4,
      date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      title: 'System Maintenance Scheduled',
      message: 'We will perform routine maintenance next weekend. Expect brief interruptions.',
      icon: '⚠️',
      type: 'warning'
    },
    {
      id: 5,
      date: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
      title: 'Developer Update',
      message: 'Backend API performance improvements have been deployed. Enjoy faster load times!',
      icon: '🚀',
      type: 'update'
    }
  ]);

  const API_KEY_MAP = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "";
  
  // Format date helper
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
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
    // Add animation trigger
    setAnimatingIds(prev => new Set(prev).add(id));
    
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
    
    // Remove animation class after animation completes
    setTimeout(() => {
      setAnimatingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 400);
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
      {/* Announcements Section */}
      <div className="card" style={styles.announcementsContainer}>
        <h2>📢 Announcements</h2>
        <div style={styles.announcementsScroll}>
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              style={styles.announcement(announcement.type)}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, styles.announcementHover);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              <span style={styles.announcementIcon}>{announcement.icon}</span>
              <div style={styles.announcementContent}>
                <div style={styles.announcementHeader}>
                  <h3 style={styles.announcementTitle}>{announcement.title}</h3>
                  <span style={styles.announcementDate}>
                    {formatDate(announcement.date)}
                  </span>
                </div>
                <p style={styles.announcementText}>{announcement.message}</p>
              </div>
            </div>
          ))}
        </div>
        {announcements.length > 1 && (
          <div style={styles.scrollHint}>
            ↓ Scroll to see more announcements ↓
          </div>
        )}
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
          <TransitionGroup component="ul" style={styles.todoList}>
            {[...todos]
              .sort((a, b) => {
                // Sort: incomplete tasks first, completed tasks last
                if (a.completed === b.completed) return 0;
                return a.completed ? 1 : -1;
              })
              .map(todo => (
                <CSSTransition
                  key={todo.id}
                  timeout={500}
                  classNames="todo-item"
                >
                  <li 
                    style={styles.todoItem}
                    className={`todo-item-transition ${
                      animatingIds.has(todo.id) 
                        ? (todo.completed ? 'todo-checked' : 'todo-unchecked')
                        : ''
                    }`}
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
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}

        <p style={styles.stats}>
          Total: {todos.length} task{todos.length !== 1 ? 's' : ''} | 
          Completed: {todos.filter(t => t.completed).length}
        </p>
      </div>

      <div className="card" style={styles.todoCard}>
        <h2>Map View</h2>
        <div style={styles.mapContainer}>
          <div style={styles.mapWidget}>
            <h3 style={styles.mapTitle}>📍 Location</h3>
            <iframe
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '8px' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY_MAP}&q=Space+Needle,Seattle+WA`}
            />
          </div>
          <div style={styles.mapWidget}>
            <h3 style={styles.mapTitle}>🗺️ Directions</h3>
            <iframe
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '8px' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/directions?key=${API_KEY_MAP}&origin=Oslo+Norway&destination=Telemark+Norway&avoid=tolls|highways`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;