import { useEffect, useState } from "react";
import "./App.css";

type Todo = {
  id: string;
  title: string;
  deadline?: string;
  isDone: boolean;
  createdAt: string;
};

const API_URL = "http://localhost:5256/api/todos";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  const loadTodos = async () => {
    const res = await fetch(API_URL);

    if (!res.ok) {
      setError("Error loading tasks");
      return;
    }

    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (title.trim().length <= 10) {
      setError("Task must be longer than 10 characters.");
      return;
    }

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        deadline: deadline || null,
      }),
    });

    if (!res.ok) {
      setError("Error creating task");
      return;
    }

    setTitle("");
    setDeadline("");
    await loadTodos();
  };

  const handleDone = async (id: string) => {
    await fetch(`${API_URL}/${id}/done`, { method: "PUT" });
    await loadTodos();
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");

    if (!confirmDelete) return;

    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    await loadTodos();
  };

  const isOverdue = (deadline?: string) => {
    if (!deadline) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);

    return deadlineDate < today;
  };

  return (
    <main className="page">
      <section className="card">
        <header className="header">
          <h1>Todo App</h1>
          <p>Manage your tasks and deadlines</p>
        </header>

        <form className="todo-form" onSubmit={handleAddTodo}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task (min. 11 characters)"
          />

          <div className="date-field">
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="date-input"
            />
          </div>

          <button type="submit">Add</button>
        </form>

        {error && <p className="error">{error}</p>}

        <table className="todo-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {todos.length === 0 && (
              <tr>
                <td colSpan={4} className="empty">
                  No tasks yet.
                </td>
              </tr>
            )}

            {todos.map((todo) => {
              const overdue = isOverdue(todo.deadline) && !todo.isDone;

              return (
                <tr
                  key={todo.id}
                  className={`${overdue ? "overdue" : ""} ${todo.isDone ? "done-row" : ""
                    }`}
                >
                  <td className={todo.isDone ? "done-title" : ""}>
                    {todo.title}
                  </td>
                  <td>
                    {todo.deadline
                      ? new Date(todo.deadline).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    <span
                      className={`badge ${todo.isDone ? "badge-done" : overdue ? "badge-overdue" : "badge-pending"
                        }`}
                    >
                      {todo.isDone ? "Done" : overdue ? "Overdue" : "Pending"}
                    </span>
                  </td>
                  <td className="actions">
                    {!todo.isDone && (
                      <button className="done-button" onClick={() => handleDone(todo.id)}>
                        Done
                      </button>
                    )}
                    <button className="delete-button" onClick={() => handleDelete(todo.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default App;