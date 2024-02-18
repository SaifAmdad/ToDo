// finding elements
const form = document.querySelector("form");
const todoInput = form.querySelector("#inputTodo");
const addBtn = form.querySelector("#addBtn");
const addDeleteMessage = document.getElementById("message");

const todoList = document.querySelector(".todoList");
const loadtodos = JSON.parse(localStorage.getItem("todos"));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // uniq id for todo lists
  const todoId = Date.now().toString();
  addTodoItem(todoId);
});

// -------------------------------------------
// add todo here
const addTodoItem = (todoId) => {
  console.log(todoId);
  const todoValue = todoInput.value;
  const todoItem = document.createElement("div");
  todoItem.id = todoId;
  todoItem.classList.add("todoItem");
  todoItem.innerHTML = `
  <p class="todo">${todoValue}</p>
  <button type="submit" class="deleteBtn" id="deleteBtn">
    <img src="icons/trash-solid.svg" alt="Delete" />
  </button>`;
  todoList.appendChild(todoItem);
  addDeleteMessage.innerText = "Todo has added!";
  addDeleteMessage.classList.add("addMessage");
  setTimeout(() => {
    addDeleteMessage.innerText = "";
    addDeleteMessage.classList.remove("addMessage");
  }, 1000);
  todoInput.value = "";

  const deleteBtn = todoItem.querySelector("#deleteBtn");

  deleteBtn.addEventListener("click", deletTodo);

  //  ---------------------------------------
  // todos in local storage
  const todosFromLS = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  todosFromLS.push({ todoId, todoValue });
  localStorage.setItem("todos", JSON.stringify(todosFromLS));
  console.log(todosFromLS);
};

// ------------------------------------------------------------
// load todo form local storage
window.addEventListener("DOMContentLoaded", () => {
  //   const loadtodos = JSON.parse(localStorage.getItem("todos"));
  console.log(loadtodos);
  loadtodos.map((todo) => {
    // displyTodo(todo);
    const todoValue = todo.todoValue;
    const todoItem = document.createElement("div");
    todoItem.id = todo.todoId;
    todoItem.classList.add("todoItem");
    todoItem.innerHTML = `
  <p class="todo">${todoValue}</p>
  <button type="submit" class="deleteBtn" id="deleteBtn">
    <img src="icons/trash-solid.svg" alt="Delete" />
  </button>`;
    todoList.appendChild(todoItem);

    const deleteBtn = todoItem.querySelector("#deleteBtn");
    deleteBtn.addEventListener("click", deletTodo);
  });
});

// --------------------------------------------------------------
// Delet todo here
const deletTodo = (event) => {
  const selectedItem = event.target.parentElement.parentElement;
  const confirmation = confirm("Are you sure?");
  if (confirmation) {
    todoList.removeChild(selectedItem);
    const selectedItemId = selectedItem.id;
    const selectedTodo = JSON.parse(localStorage.getItem("todos"));
    const updateTodo = selectedTodo.filter(
      (todo) => todo.todoId !== selectedItemId
    );
    localStorage.setItem("todos", JSON.stringify(updateTodo));
    addDeleteMessage.innerText = "Todo deleted!";
    addDeleteMessage.classList.add("deleteMessage");
    setTimeout(() => {
      addDeleteMessage.innerText = "";
      addDeleteMessage.classList.remove("deleteMessage");
    }, 2000);
    console.log(updateTodo);
  }
};
