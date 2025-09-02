import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

import {
  createTodo,
  getAllTodo,
  updateTodo,
  deleteTodo,
} from "../../auth/TodoAuth";
import { toast } from "react-toastify";

const Home = () => {
  const [visiable, setvisiable] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchTodos = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id || user?._id;
      if (!userId) return;
      const data = await getAllTodo(userId);
      setTodos(Array.isArray(data?.todos) ? data.todos : []);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Title and description are required.");
      return;
    }
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const createdBy = userData && userData.id;
      const data = { title, description, createdBy };
      if (editingId) {
        await updateTodo(editingId, { title, description });
        toast.success("Task updated successfully!");
      } else {
        await createTodo(data);
        toast.success("Task created successfully!");
      }
      setTitle("");
      setDescription("");
      setvisiable(false);
      setEditingId(null);
      fetchTodos();
    } catch (error) {
      toast.error("Failed to create task. Please try again.");
      console.error(error);
    }
  };

  const startEdit = (todo) => {
    setTitle(todo.title || "");
    setDescription(todo.description || "");
    setEditingId(todo._id);
    setvisiable(true);
  };

  const handleDelete = async (todoId) => {
    try {
      await deleteTodo(todoId);
      toast.success("Task deleted successfully!");
      fetchTodos();
    } catch (err) {
      toast.error("Failed to delete task.");
      console.error(err);
    }
  };

  const toggleComplete = async (todo) => {
    try {
      await updateTodo(todo._id, { completed: !todo.completed });
      toast.success(!todo.completed ? "Marked as done" : "Marked as pending");
      fetchTodos();
    } catch (err) {
      toast.error("Failed to update status.");
      console.error(err);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-gray-50 to-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Your Tasks
            </h1>
            <div className="flex gap-3 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search tasks"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 sm:w-80 px-4 py-2.5 border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              <button
                onClick={() => setvisiable(true)}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl shadow-sm hover:bg-blue-700 active:bg-blue-800 transition font-medium"
              >
                + New Task
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats */}
        <div className="mb-5 grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-xl bg-white border border-gray-200 p-3 text-center">
            <div className="text-gray-500">Total</div>
            <div className="font-semibold text-gray-900">{todos.length}</div>
          </div>
          <div className="rounded-xl bg-white border border-gray-200 p-3 text-center">
            <div className="text-gray-500">Active</div>
            <div className="font-semibold text-gray-900">
              {todos.filter((t) => !t.completed).length}
            </div>
          </div>
          <div className="rounded-xl bg-white border border-gray-200 p-3 text-center">
            <div className="text-gray-500">Completed</div>
            <div className="font-semibold text-gray-900">
              {todos.filter((t) => t.completed).length}
            </div>
          </div>
        </div>
        {todos.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="text-lg font-medium text-gray-700">
              No tasks yet
            </div>
            <div className="mt-1 text-sm text-gray-500">
              Create your first task to get started.
            </div>
            <button
              onClick={() => setvisiable(true)}
              className="mt-6 inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700"
            >
              Create Task
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {todos
              .filter((t) => {
                const q = search.trim().toLowerCase();
                if (!q) return true;
                return (
                  (t.title || "").toLowerCase().includes(q) ||
                  (t.description || "").toLowerCase().includes(q)
                );
              })
              .map((todo) => (
                <div
                  key={todo._id}
                  className={`group border rounded-2xl p-5 bg-gray-50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all ring-1 ring-transparent hover:ring-blue-100 ${
                    todo.completed ? "border-green-200" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={!!todo.completed}
                        onChange={() => toggleComplete(todo)}
                        className="h-5 w-5 accent-green-600 rounded cursor-pointer"
                      />
                      <h3
                        className={`font-semibold truncate max-w-[16rem] ${
                          todo.completed
                            ? "text-gray-400 line-through"
                            : "text-gray-900"
                        }`}
                      >
                        {todo.title}
                      </h3>
                    </div>
                    {todo.completed ? (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-green-100 text-green-700 rounded-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        Done
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-600"></span>
                        Pending
                      </span>
                    )}
                  </div>
                  <p
                    className={`mt-3 text-sm break-words line-clamp-3 ${
                      todo.completed
                        ? "text-gray-400 line-through"
                        : "text-gray-600"
                    }`}
                  >
                    {todo.description}
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    Created on {new Date(todo.createdAt).toLocaleString()}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => startEdit(todo)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 shadow-sm"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 3.487a1.5 1.5 0 0 1 2.121 2.121L7.5 17.092 3 18l.908-4.5L16.862 3.487z"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-sm"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1m-9 0H4m13 0h3"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Backdrop */}
      {visiable && (
        <div
          onClick={() => setvisiable(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-[1px] z-40"
        />
      )}
      {/* Modal/Drawer for Add Task */}
      <form
        onSubmit={handelSubmit}
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-all duration-300 z-50 ${
          visiable ? "w-full sm:max-w-md" : "w-0 overflow-hidden"
        }`}
      >
        <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b">
          <h1 className="text-xl font-semibold">
            {editingId ? "Edit Task" : "Add New Task"}
          </h1>
          <button
            type="button"
            onClick={() => setvisiable(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="px-4 sm:px-6 py-4 flex flex-col gap-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="title"
              placeholder="Add your task"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
              value={title}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              id="description"
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 resize-none"
              placeholder="Describe your task"
              value={description}
            ></textarea>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setDescription("");
                setEditingId(null);
                setvisiable(false);
              }}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              {editingId ? "Save Changes" : "Add Task"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Home;
