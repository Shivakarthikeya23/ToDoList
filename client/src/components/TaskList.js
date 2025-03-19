import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`${API_URL}/api/tasks`, {
        headers: getAuthHeader(),
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError(error.response?.data?.error || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      setError("");
      await axios.delete(`${API_URL}/api/tasks/${taskId}`, {
        headers: getAuthHeader(),
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      setError(error.response?.data?.error || "Failed to delete task");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleTaskUpdate = async (taskId, updatedTask) => {
    try {
      setError("");
      const response = await axios.put(
        `${API_URL}/api/tasks/${taskId}`,
        updatedTask,
        { headers: getAuthHeader() }
      );
      setTasks(
        tasks.map((task) => (task._id === taskId ? response.data : task))
      );
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
      setError(error.response?.data?.error || "Failed to update task");
    }
  };

  const handleTaskCreate = async (newTask) => {
    try {
      setError("");
      const response = await axios.post(`${API_URL}/api/tasks`, newTask, {
        headers: getAuthHeader(),
      });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error creating task:", error);
      setError(error.response?.data?.error || "Failed to create task");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Tasks</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <TaskForm
        onSubmit={
          editingTask
            ? (data) => handleTaskUpdate(editingTask._id, data)
            : handleTaskCreate
        }
        initialData={editingTask}
      />
      <div className="mt-4">
        {loading ? (
          <div className="text-center">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center">No tasks found. Add one above!</div>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={task.completed}
                    onChange={() =>
                      handleTaskUpdate(task._id, {
                        ...task,
                        completed: !task.completed,
                      })
                    }
                  />
                  <label className="form-check-label">Completed</label>
                </div>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => handleEdit(task)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
