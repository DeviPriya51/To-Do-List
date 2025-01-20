import React, { useState } from 'react';

function Home() {
  const [task, setTask] = useState(''); // Input field value
  const [tasks, setTasks] = useState({ todo: [], ongoing: [], completed: [], delete: [] }); // Task categories

  // Handle input change
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Add task to "To-Do" section
  const addTask = () => {
    if (task.trim() !== '') {
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, task],
      }));
      setTask(''); // Clear input
    }
  };

  // Move task to another category
  const moveTask = (currentCategory, targetCategory, taskToMove) => {
    setTasks((prevTasks) => {
      // Remove task from current category
      const updatedCurrent = prevTasks[currentCategory].filter(
        (t) => t !== taskToMove
      );
      // Add task to target category
      const updatedTarget = [...prevTasks[targetCategory], taskToMove];
      return { ...prevTasks, [currentCategory]: updatedCurrent, [targetCategory]: updatedTarget };
    });
  };

  return (
    <div className="home">
      <form
        className="task-form"
        onSubmit={(e) => {
          e.preventDefault(); // Prevent form reload
          addTask();
        }}
      >
        <input
          type="text"
          placeholder="Enter task..."
          className="task-input"
          value={task}
          onChange={handleInputChange}
        />
        <button
          type="button"
          className="task-add"
          onClick={addTask}
        >
          ADD TASK
        </button>
      </form>
      <div className="task-sections">
        {/* To-Do Section */}
        <div className="task-section">
          <h2>To-Do Tasks</h2>
          <ul>
            {tasks.todo.map((t, index) => (
              <li key={index}>
                {t}
                <button className="task-move"
                  onClick={() => moveTask('todo', 'ongoing', t)}
                >
                  Activate
                </button>
                <button className="task-move"
                  onClick={() => moveTask('todo', 'delete', t)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Ongoing Section */}
        <div className="task-section">
          <h2>Active Tasks</h2>
          <ul>
            {tasks.ongoing.map((t, index) => (
              <li key={index}>
                <input type='checkbox' onClick={() => moveTask('ongoing', 'completed', t)}></input>
                {t}
                <button className="task-move"
                  onClick={() => moveTask('ongoing', 'todo', t)}
                >
                  To-Do
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Completed Section */}
        <div className="task-section">
          <h2>Completed Tasks</h2>
          <ul>
            {tasks.completed.map((t, index) => (
              <li key={index}>
                <div className='complete'>
                {t}
                </div>
                <button className="task-move"
                  onClick={() => moveTask('completed', 'todo', t)}
                >
                  Re-Do
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;