// TodoList.jsx Add a component to display the list of todos with a delete button for each todo
import React from "react";

const TodoList = ({ todos }) => {
  return (
    <ul>
        {todos.map((todo) => (
            <li key={todo.id}>
                {todo.text}
            </li>
        ))}
    </ul>
    );
};

export default TodoList;
