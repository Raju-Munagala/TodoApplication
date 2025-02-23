import { useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

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

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">To-Do List</h2>
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-grow p-2 border rounded-l"
            placeholder="Add a new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-r"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        <ul className="list-none p-0">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-2 border-b"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(index)}
              />
              <span
                className={`flex-grow ml-2 ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.text}
              </span>
              <button
                className="bg-red-500 text-white p-1 rounded"
                onClick={() => removeTask(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
