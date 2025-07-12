const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

// Load saved tasks
window.onload = () => {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.forEach(todo => addTodo(todo.text, todo.completed));
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = input.value.trim();
  if (task) {
    addTodo(task);
    input.value = "";
  }
});

function addTodo(text, completed = false) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = text;
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTodos();
  });

  const btn = document.createElement("button");
  btn.innerHTML = "🗑️";
  btn.addEventListener("click", () => {
    li.remove();
    saveTodos();
  });

  li.appendChild(span);
  li.appendChild(btn);
  list.appendChild(li);
  saveTodos();
}

function saveTodos() {
  const todos = [];
  list.querySelectorAll("li").forEach(li => {
    todos.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
