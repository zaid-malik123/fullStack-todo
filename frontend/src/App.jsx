import { useEffect, useState } from "react";
import axios from "axios";

// Use backend URL from environment variable
const baseUrl = import.meta.env.VITE_API_URL + "/api/todo";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const res = await axios.get(baseUrl);
      setTodos(res.data);
    } catch (err) {
      console.error("Failed to fetch todos:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await axios.post(`${baseUrl}/create`, { title, description });
      setTodos([res.data, ...todos]);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  };

  // Toggle complete
  const toggleComplete = async (id, isCompleted) => {
    try {
      const res = await axios.put(`${baseUrl}/update/${id}`, { isCompleted: !isCompleted });
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error("Failed to toggle todo:", err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${baseUrl}/delete/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Todo List ✅</h1>

        {/* Form */}
        <form onSubmit={addTodo} className="flex flex-col gap-3 mb-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition"
          >
            Add Todo
          </button>
        </form>

        {/* Todos */}
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border"
            >
              <div>
                <h3
                  className={`font-semibold ${
                    todo.isCompleted ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.title}
                </h3>
                <p className="text-sm text-gray-600">{todo.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleComplete(todo._id, todo.isCompleted)}
                  className={`px-3 py-1 rounded-lg text-white ${
                    todo.isCompleted ? "bg-yellow-500" : "bg-green-500"
                  }`}
                >
                  {todo.isCompleted ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="px-3 py-1 rounded-lg bg-red-500 text-white"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
