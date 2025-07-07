import React, { useState } from 'react';
import './App.css';

function App() {
  // STATE: Store our data with sample tasks pre-loaded
  const [tasks, setTasks] = useState([
    // Personal Tasks
    { id: 1, text: "Buy groceries", completed: false },
    { id: 2, text: "Call mom", completed: true },
    { id: 3, text: "Exercise for 30 minutes", completed: false },
    { id: 4, text: "Read a book chapter", completed: false },
    
    // Work/Study Tasks
    { id: 5, text: "Finish React tutorial", completed: false },
    { id: 6, text: "Review meeting notes", completed: true },
    { id: 7, text: "Send email to team", completed: false },
    { id: 8, text: "Practice coding problems", completed: false },
    
    // Fun Tasks
    { id: 9, text: "Watch a movie", completed: true },
    { id: 10, text: "Try new recipe", completed: false },
    { id: 11, text: "Walk in the park", completed: false }
  ]);
  
  const [inputValue, setInputValue] = useState('');

  // FUNCTION: Add new task
  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: Date.now(), // Simple unique ID
        text: inputValue,
        completed: false
      };
      setTasks([...tasks, newTask]); // Add to existing tasks
      setInputValue(''); // Clear input
    }
  };

  // FUNCTION: Toggle task completion
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // FUNCTION: Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // FUNCTION: Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // FUNCTION: Clear all completed tasks
  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  // FUNCTION: Mark all tasks as complete
  const markAllComplete = () => {
    setTasks(tasks.map(task => ({ ...task, completed: true })));
  };

  return (
    <div className="App">
      <div className="todo-container">
        <h1>My Todo List</h1>
        <p className="subtitle">Sample tasks loaded - try checking, adding, and deleting!</p>
        
        {/* INPUT SECTION */}
        <div className="input-section">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="task-input"
          />
          <button onClick={addTask} className="add-button">
            Add
          </button>
        </div>

        {/* BULK ACTIONS */}
        {tasks.length > 0 && (
          <div className="bulk-actions">
            <button onClick={markAllComplete} className="bulk-button">
              Mark All Complete
            </button>
            <button onClick={clearCompleted} className="bulk-button clear-button">
              Clear Completed
            </button>
          </div>
        )}

        {/* TASK LIST */}
        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="no-tasks">No tasks yet. Add one above!</p>
          ) : (
            tasks.map(task => (
              <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="task-checkbox"
                />
                <span className="task-text">{task.text}</span>
                <button onClick={() => deleteTask(task.id)} className="delete-button">
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {/* TASK COUNTER */}
        {tasks.length > 0 && (
          <div className="task-counter">
            <strong>{tasks.filter(task => !task.completed).length}</strong> of <strong>{tasks.length}</strong> tasks remaining
          </div>
        )}

        {/* TASK BREAKDOWN */}
        {tasks.length > 0 && (
          <div className="task-breakdown">
            <div className="breakdown-item">
              <span className="breakdown-label">Completed:</span>
              <span className="breakdown-count">{tasks.filter(task => task.completed).length}</span>
            </div>
            <div className="breakdown-item">
              <span className="breakdown-label">Remaining:</span>
              <span className="breakdown-count">{tasks.filter(task => !task.completed).length}</span>
            </div>
            <div className="breakdown-item">
              <span className="breakdown-label">Total:</span>
              <span className="breakdown-count">{tasks.length}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;