import React, { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoCard from "./TodoCard";

const App = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos((prev) => [
      ...prev,
      {
        completed: false,
        id: Date.now(),
        text,
        notes: "",
        priority: "Medium",
        dueDate: "",
      },
    ]);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Merges only the changed fields into the matching todo
  const updateTodo = (id, changes) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...changes } : todo)),
    );
  };

  return (
    <div>
      <h1>My Todos</h1>
      <AddTodoForm addTodo={addTodo} />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
