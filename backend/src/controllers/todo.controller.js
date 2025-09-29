// controllers/todoController.js
import Todo from "../models/todo.model.js";

// @desc Create a new todo
export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    const todo = await Todo.create({
      title,
      description,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error });
  }
};

// @desc Get all todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
};


// @desc Update todo
export const updateTodo = async (req, res) => {
  try {
    const { title, description, isCompleted } = req.body;

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, isCompleted },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
};

// @desc Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
};
