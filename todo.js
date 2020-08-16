const todoForm = document.querySelector(".js-todoForm"),
  todoInput = todoForm.querySelector("input"),
  todoList = document.querySelector(".js-todoList");

const TODOS_LS = "toDos";
let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  todoList.removeChild(li);

  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveTodo();
  console.log(toDos);
}

function saveTodo() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const dltBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  dltBtn.innerText = "❌";
  dltBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(dltBtn);
  todoList.appendChild(li);
  li.id = newId;

  const toDoObj = {
    text: text,
    id: newId,
  };

  toDos.push(toDoObj);
  saveTodo();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = todoInput.value;
  paintToDo(currentValue);
  todoInput.value = "";
}

function loadToDo() {
  const loadedtoDos = localStorage.getItem(TODOS_LS);
  if (loadedtoDos !== null) {
    const parsedToDos = JSON.parse(loadedtoDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDo();
  todoForm.addEventListener("submit", handleSubmit);
}

init();
console.log(toDos);
