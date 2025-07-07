import React, { useState } from 'react';
import './App.css';

function App() {
  // STATE: Store our data
  const [tasks, setTasks] = useState([]);
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

  return (
    <div className="App">
      <div className="todo-container">
        <h1>My Todo List</h1>
        
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
            {tasks.filter(task => !task.completed).length} of {tasks.length} tasks remaining
          </div>
        )}
      </div>
    </div>
  );
}

export default App;