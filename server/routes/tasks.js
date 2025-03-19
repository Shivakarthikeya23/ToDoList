const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all tasks for the authenticated user
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new task
router.post("/", auth, async (req, res) => {
  try {
    console.log("Creating task with data:", req.body);
    console.log("User ID:", req.user._id);

    const task = await Task.create({
      ...req.body,
      user: req.user._id,
    });

    console.log("Task created successfully:", task);
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});

// Update a task
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
