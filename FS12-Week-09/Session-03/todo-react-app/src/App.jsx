import { useState } from "react";
import "./App.css";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import DeleteButton from "./DeleteButton";


function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build a Todo App" },
  ]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text };
    setTodos([...todos, newTodo]);
  };

  const newTodo = localStorage.getItem("todos");
  if (newTodo) {
    setTodos(JSON.parse(newTodo));
  };


  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <h1>Todo List</h1>
      <h3>Add a new todo:</h3>
      <AddTodoForm addTodo={addTodo} />
      <TodoList todos={todos} />
    </>
  );
}

export default App;