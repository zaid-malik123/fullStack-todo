// routes/todoRoutes.js
import express from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";

const router = express.Router();

// @route POST /api/todos
router.post("/create", createTodo);

// @route GET /api/todos
router.get("/", getTodos);

// @route PUT /api/todos/:id
router.put("/update/:id", updateTodo);

// @route DELETE /api/todos/:id
router.delete("/delete/:id", deleteTodo);

export default router;
