const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greetings = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
SHOWING_ON = 'showing';

function saveName(text){
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = input.value;
  paintGreetings(currentValue);
  saveName(currentValue);
}

function askForName(){
  form.classList.add(SHOWING_ON);
  form.addEventListener('submit', handleSubmit);
}

function paintGreetings(text) {
  form.classList.remove(SHOWING_ON);
  greetings.classList.add(SHOWING_ON);
  greetings.innerText = `Hello ${text}!`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreetings(currentUser);
  }
}

function init() {
  loadName();
}

init();
