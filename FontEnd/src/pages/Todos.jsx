import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import { getAllTodo } from "../../auth/TodoAuth";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id || user?._id;
        if (!userId) return;
        const data = await getAllTodo(userId);
        setTodos(Array.isArray(data?.todos) ? data.todos : []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTodos();
  }, []);

  const filtered = useMemo(() => {
    let base = todos;
    if (filter === "active") base = base.filter((t) => !t.completed);
    if (filter === "completed") base = base.filter((t) => t.completed);
    return base;
  }, [todos, filter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <div className="border-b bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Todos
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Browse your tasks and filter by status.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="flex gap-2 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1.5 text-sm rounded-lg font-medium ${
                    filter === "all"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("active")}
                  className={`px-3 py-1.5 text-sm rounded-lg font-medium ${
                    filter === "active"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilter("completed")}
                  className={`px-3 py-1.5 text-sm rounded-lg font-medium ${
                    filter === "completed"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="text-lg font-medium text-gray-700">
              No tasks to display
            </div>
            <div className="mt-1 text-sm text-gray-500">
              Try switching filters or create a new task.
            </div>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((todo) => (
              <div
                key={todo._id}
                className={`group border rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition ${
                  todo.completed ? "border-green-200" : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <h3
                    className={`font-semibold truncate max-w-[16rem] ${
                      todo.completed
                        ? "text-gray-400 line-through"
                        : "text-gray-900"
                    }`}
                  >
                    {todo.title}
                  </h3>
                  {todo.completed ? (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-md">
                      Done
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md">
                      Pending
                    </span>
                  )}
                </div>
                <p
                  className={`mt-3 text-sm break-words ${
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Todos;
