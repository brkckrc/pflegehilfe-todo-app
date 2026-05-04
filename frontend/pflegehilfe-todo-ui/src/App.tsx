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
    const response = await fetch(API_URL);
    const data = await response.json();
    setTodos(data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAddTodo = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (title.trim().length <= 10) {
      setError("Task must be longer than 10 characters.");
      return;
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.trim(),
        deadline: deadline || null,
      }),
    });

    if (!response.ok) {
      const message = await response.text();
      setError(message || "Something went wrong.");
      return;
    }

    setTitle("");
    setDeadline("");
    await loadTodos();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Todo App</h1>

      <form onSubmit={handleAddTodo} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Task
            <br />
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter task title"
              style={{ width: "100%", padding: "8px" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Deadline
            <br />
            <input
              type="date"
              value={deadline}
              onChange={(event) => setDeadline(event.target.value)}
              style={{ padding: "8px" }}
            />
          </label>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Add Task</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.isDone ? "Done" : "Pending"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;