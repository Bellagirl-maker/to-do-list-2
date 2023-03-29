import './style.css';
import todoList from './todoList.js';
import { add } from './addRemove.js';

const tasks = todoList;

const toDoBox = document.querySelector('.todo-box');

// let countTask = 0;
localStorage.setItem('countTask', 0);

console.log(todoList[0].description);

const renderTasks = () => {
  localStorage.setItem('countTask', 0); // test
  let count = localStorage.getItem('countTask');

  toDoBox.innerHTML = '';
  // todoIntro();
  const headerLi = document.createElement('li');
  headerLi.classList.add('header-li');
  headerLi.innerHTML = 'Today\'s To Do <i class="fa-solid fa-rotate"></i>';

  const addToList = document.createElement('li');
  addToList.classList.add('add-to-list');

  const form = document.createElement('form');
  form.classList.add('add-list-form');

  const newItem = document.createElement('input');
  newItem.id = 'new-item';
  newItem.type = 'text';
  newItem.placeholder = 'Add to your list';
  newItem.setAttribute('required', '');

  const submitBtn = document.createElement('button');
  submitBtn.classList.add('submit-btn');
  submitBtn.type = 'submit';
  submitBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';

  toDoBox.appendChild(headerLi);
  toDoBox.appendChild(addToList);
  addToList.appendChild(form);
  form.appendChild(newItem);
  form.appendChild(submitBtn);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    add(newItem);
    newItem.value = '';
    renderTasks();
  });

  tasks
    .sort((a, b) => a.index - b.index)
    .forEach((task) => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-item');

      const listCheckAndName = document.createElement('div');
      listCheckAndName.classList.add('list-check-and-name');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';

      const itemValInput = document.createElement('input');
      itemValInput.classList.add('list-item-value');
      itemValInput.value = task.description;

      const listElipsesBox = document.createElement('div');
      listElipsesBox.classList.add('list-ellipses-box');
      listElipsesBox.innerHTML = '<i class="fa-solid fa-ellipsis-vertical">';

      // Change ellipses to deleteBtn when the input field is in focus
      itemValInput.addEventListener('focus', () => {
        listElipsesBox.classList.add('del-btn');
        listElipsesBox.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
      });

      itemValInput.addEventListener('blur', () => {
        listElipsesBox.classList.remove('del-btn');
        listElipsesBox.innerHTML = '<i class="fa-solid fa-ellipsis-vertical">';
      });

      // try updating
      itemValInput.addEventListener('keyup', (e) => {
        // console.log(todoList[0].description);
        // update(Number(count), 'description', e.target.value);
        todoList[Number(count)].description = e.target.value;
        localStorage.setItem('todolist', JSON.stringify(todoList));
      });

      listCheckAndName.appendChild(checkbox);
      listCheckAndName.appendChild(itemValInput);

      listItem.appendChild(listCheckAndName);
      listItem.appendChild(listElipsesBox);

      toDoBox.appendChild(listItem);

      count = Number(count) + 1;
      if (Number(count) === todoList.length) {
        count = todoList.length - 1;
      }
    });
};
renderTasks();

const clearLi = document.createElement('li');
clearLi.classList.add('clear-li');
clearLi.innerHTML = 'Clear all completed';
toDoBox.appendChild(clearLi);

// const form = document.querySelector('form');
// const input = document.getElementById('new-item');
// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   add(input);
//   input.value = '';
//   renderTasks();
// });

// const submitBtn = document.querySelector('.submit-btn');
// submitBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   add(value);
//   value.value = '';
//   renderTasks();
// });