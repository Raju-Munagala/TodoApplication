import { useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editInput, setEditInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { text: input, completed: false }]);
    setInput("");
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  const editTask = (index, newText) => {
    setTasks(
      tasks.map((task, i) => (i === index ? { ...task, text: newText } : task))
    );
  };

  const clearAllTasks = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all tasks?"
    );
    if (confirmClear) {
      setTasks([]);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 m-44">
        <h2 className="text-xl font-bold mb-4">To-Do List</h2>
        <div className="flex mb-4 gap-1">
          <input
            type="text"
            className="flex-grow p-2 border rounded-l"
            placeholder="Add a new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-lg"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
        <ul className="list-none p-0">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-2 border-b gap-1"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(index)}
              />
              {editIndex === index ? (
                <input
                  type="text"
                  className="flex-grow ml-2 p-1 border"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                  onBlur={() => {
                    editTask(index, editInput);
                    setEditIndex(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      editTask(index, editInput);
                      setEditIndex(null);
                    }
                  }}
                  autoFocus
                />
              ) : (
                <span
                  className={`flex-grow ml-2 ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                  onDoubleClick={() => {
                    setEditIndex(index);
                    setEditInput(task.text);
                  }}
                >
                  {task.text}
                </span>
              )}
              <button
                className="bg-yellow-500 text-white p-1 rounded"
                onClick={() => {
                  setEditIndex(index);
                  setEditInput(task.text);
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white p-1 rounded"
                onClick={() => removeTask(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        {tasks.length > 0 && (
          <button
            className="bg-red-600 text-white p-2 rounded w-full mt-4"
            onClick={clearAllTasks}
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
