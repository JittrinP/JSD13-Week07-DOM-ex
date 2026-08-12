// DOM Exercise: To-Do List
// Work through the TODOs in order. Open index.html in a browser to test.

// TODO 1: Select the elements you'll need:
//   - the form (#todo-form)
//   - the input (#todo-input)
//   - the list (#todo-list)
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
console.log(todoForm);
console.log(todoInput);
console.log(todoList);

// TODO 2: Listen for the form's "submit" event. Inside the handler:
//   - call event.preventDefault() so the page doesn't reload
//   - read and trim the input's value
//   - if it's empty, do nothing (return)
//   - otherwise, create a new to-do item (see TODO 3) and clear the input
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  //trim()
  const input = todoInput.value.trim();
  if (input === "") {
    return;
  } else {
    // console.log(input);
    addTodo(input);
    todoInput.value = "";
  }
});
// TODO 3: Write a function addTodo(text) that:
//   - creates an <li>
//   - creates a <span class="todo-text"> inside it containing the text
//   - creates a <button class="delete-btn"> inside it with text "x"
//   - appends the <li> to the list
//
function addTodo(input) {
  // creates an <li> and <span class="todo-text">
  const todoItem = document.createElement(`li`);
  // creates a <span class="todo-text"> inside it containing the text
  const todoItem_text = document.createElement(`span`);
  todoItem.appendChild(todoItem_text);
  todoItem_text.classList.add("todo-text");
  todoItem_text.textContent = `${input}`;
  // creates a <button class="delete-btn"> inside it with text "x"
  const delBtn = document.createElement("button");
  delBtn.classList.add("delete-btn");
  delBtn.textContent = "x";
  todoItem.append(delBtn);
  // appends the <li> to the list
  todoList.append(todoItem);
  console.log(todoItem);

  // Hint: use document.createElement, textContent, and append/appendChild.

  // TODO 4: When the delete button inside an <li> is clicked, remove that <li>
  // from the list. (Attach this listener when you create the button in TODO 3.)
  delBtn.addEventListener("click", () => {
    todoItem.remove();
  });

  // TODO 5: When the todo-text span inside an <li> is clicked, toggle the
  // "completed" class on the <li>. (Attach this listener when you create the
  // span in TODO 3.)

  todoItem_text.addEventListener("click", () => {
    todoItem.classList.toggle("completed");
    console.log(todoItem_text);
  });
}
