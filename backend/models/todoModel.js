import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Must provide a title"] },
  description: { type: String, required: [true, "Must provide a description"] },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
