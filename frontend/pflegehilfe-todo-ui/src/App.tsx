import { useEffect, useState } from "react";

type Todo = {
  id: string;
  title: string;
  deadline?: string;
  isDone: boolean;
  createdAt: string;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("http://localhost:5256/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App</h1>

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