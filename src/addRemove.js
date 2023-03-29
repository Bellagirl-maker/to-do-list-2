import todolist from './todoList.js';

export const add = (task) => {
  todolist.push({
    description: task.value,
    completed: false,
    index: todolist.length + 1,
  });

  localStorage.setItem('todolist', JSON.stringify(todolist));
};

export const hey = (task) => {
  todolist.push({
    description: task.value,
    completed: false,
    index: todolist.length,
  });

  localStorage.setItem('todolist', JSON.stringify(todolist));
};