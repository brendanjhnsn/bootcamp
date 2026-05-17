// Add a delete button to remove todos
import React from "react";


const DeleteButton = ({ id, deleteTodo }) => {
  return (
    <button onClick={() => deleteTodo(id)}>Delete</button>
  );
};

export default DeleteButton;
