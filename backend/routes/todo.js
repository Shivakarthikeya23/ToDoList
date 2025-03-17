import express from "express";
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodo,
} from "../controllers/todo.js";

const router = express.Router();

router.get("/", getAllTodos);

router.post("/", createTodo);

router.put("/:id", updateTodo);

router.get("/:id", getTodo);

router.delete("/:id", deleteTodo);

export default router;
