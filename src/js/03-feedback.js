const throttle = require('lodash.throttle');
const onForm = document.querySelector('.feedback-form');
let inputEmail = document.querySelector('input[name ="email"]');
let inputMessage = document.querySelector('textarea[name ="message"]');


const formInput = {
  email: "",
  message: "",
};

// Створюємо ф-ю, яка зберігає в локальне сховище нові властивості "email" і "message".
const changedOnForm = event => {
    if(event.target.name === "email") {
        formInput.email = event.target.value;
    } else if (event.target.name === "message"){
        formInput.message = event.target.value;
    }
    localStorage.setItem('feedback-form-state', JSON.stringify(formInput));
}

// Отримуємо дані з локального сховища
const fromLocal = JSON.parse(localStorage.getItem('feedback-form-state'));
// Перевіряємо стан сховища і якщо там є дані, то заповнюємо ними форму
if (fromLocal) {
  inputEmail.value = fromLocal.email;
  inputMessage.value = fromLocal.message;
  formInput.email = fromLocal.email;
  formInput.message = fromLocal.message;
}

const submitForm = (event) => {
  event.preventDefault();
  const {elements: {email, message}} = event.target;

  if (email.value === "" || message.value === "") {
      return alert("Please fill in all the fields!");
  }
  // При натисканні кнопки submit виводимо дані зі сховища в консоль, очищаємо сховище та форму
  console.log(localStorage.getItem('feedback-form-state'));
  localStorage.removeItem('feedback-form-state');
  event.currentTarget.reset();
}

onForm.addEventListener('input', throttle(changedOnForm, 500));
onForm.addEventListener("submit", submitForm);
