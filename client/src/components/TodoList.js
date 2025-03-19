import { useState, useEffect } from "react";
import axios from "axios";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks", { withCredentials: true })
      .then((res) => setTasks(res.data));
  }, []);

  const addTask = () => {
    axios
      .post(
        "http://localhost:5000/api/tasks",
        { title: task },
        { withCredentials: true }
      )
      .then((res) => setTasks([...tasks, res.data]));
  };

  const toggleTask = (id, completed) => {
    axios
      .put(
        `http://localhost:5000/api/tasks/${id}`,
        { completed: !completed },
        { withCredentials: true }
      )
      .then(() =>
        setTasks(
          tasks.map((t) => (t._id === id ? { ...t, completed: !completed } : t))
        )
      );
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <input type="text" onChange={(e) => setTask(e.target.value)} />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            <span
              style={{ textDecoration: t.completed ? "line-through" : "none" }}
              onClick={() => toggleTask(t._id, t.completed)}
            >
              {t.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
