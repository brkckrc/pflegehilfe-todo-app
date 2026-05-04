import { useEffect, useState } from "react";

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
    loadTodos();
  };

  const handleDone = async (id: string) => {
    await fetch(`${API_URL}/${id}/done`, { method: "PUT" });
    loadTodos();
  };

  const handleDelete = async (id: string) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadTodos();
  };

  const isOverdue = (deadline?: string) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Todo App</h1>

      <form onSubmit={handleAddTodo} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
          style={{ padding: "8px", width: "60%", marginRight: "10px" }}
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />

        <button type="submit">Add</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      <table border={1} width="100%" cellPadding={10}>
        <thead>
          <tr>
            <th>Task</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo) => (
            <tr
              key={todo.id}
              style={{
                color: isOverdue(todo.deadline) && !todo.isDone ? "red" : "black",
              }}
            >
              <td>{todo.title}</td>
              <td>{todo.deadline ? new Date(todo.deadline).toLocaleDateString() : "-"}</td>
              <td>{todo.isDone ? "Done" : "Pending"}</td>
              <td>
                {!todo.isDone && (
                  <button onClick={() => handleDone(todo.id)}>Done</button>
                )}
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;