// Your Todo List App implementation will go here!
let todos = [];

// grab the form - start from chrome dev tools to do this
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const todoCount = document.querySelector("#todo-count");
const errorMessage = document.querySelector("#error-message");

// When loading, pulls from the local storage and renders the todos

document.addEventListener("DOMContentLoaded", function () {
  loadTodosFromStorage();
  renderTodos();

  todoForm.addEventListener("submit", handleFormSubmit);
  todoList.addEventListener("click", handleTodoListClick);
  todoList.addEventListener("change", handleTodoToggle);
});

function handleFormSubmit(event) {
  event.preventDefault();

  const rawTodoText = todoInput.value;
  const todoText = rawTodoText.trim();

  if (!todoText) {
    showErrorMessage("Please enter a todo item");
    return;
  }

  const minimumLength = 3;
  if (todoText.length < minimumLength) {
    showErrorMessage("Todo must be at least 3 characters long");
    return;
  }

  hideErrorMessage();
  addTodo(todoText);
  todoInput.value = "";
}

function showErrorMessage(message) {
  errorMessage.textContent = message;
  errorMessage.classList.add("show");

  setTimeout(() => {
    hideErrorMessage();
  }, 3000);
}

function hideErrorMessage() {
  errorMessage.classList.remove("show");
}

function addTodo(text) {
  const newTodo = {
    id: Date.now().toString(),
    text: text,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos.push(newTodo);
  updateUI();
}

function updateUI() {
    saveTodosToStorage();
    renderTodos();
}

function handleTodoListClick(event) {
    const todoItem = event.target.closest('.todo-item');
    if (!todoItem) return; // Click was outside a todo item
    const todoId = todoItem.dataset.id;

    if (event.target.classList.contains('delete-btn')) {
        deleteTodo(todoId);
        return;
    }
}

function handleTodoToggle(event) {
    if (event.target.type === 'checkbox') {
        const todoItem = event.target.closest('.todo-item');
        const todoId = todoItem.dataset.id;
        toggleTodo(todoId);
    }
}

function toggleTodo(id) {
    todos = todos.map(todo => {
        const isTargetTodo = todo.id === id;
        if (isTargetTodo) {
            const updatedTodo = {... todo, completed: !todo.completed };
            return updatedTodo;
        }
        return todo;
    });
    updateUI();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    updateUI();
}

function renderTodos() {
    todoList.innerHTML = "";

    if (todos.length === 0) {
        todoList.innerHTML = "<p>No todos yet! Add one above.</p>";
        return;
    }

    todos.forEach(todo => {
        const todoElement = createTodoElement(todo);
        todoList.appendChild(todoElement);
    });
}

    li.innerHTML = `
        <input type="checkbox"
               class="todo-checkbox"
               ${checkboxChecked}
               aria-label="Mark "${todo.text}" as ${checkboxAction}">
        <span class="todo-text"></span>
        <div class="todo-actions">
            <button class="delete-btn" aria-label="Delete "${todo.text}"">Delete</button>
        </div>
    `;

function createTodoElement(todo) {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.dataset.id = todo.id;
    li.className = "todo-item" + (todo.completed ? " completed" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.className = "todo-checkbox";

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn);

    return li;
}   

function saveTodosToStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodosFromStorage() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    }
}