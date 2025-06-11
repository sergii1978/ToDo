
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const taskInput = document.getElementById('task');
  const dateInput = document.getElementById('date');
  const list = document.getElementById('task-list');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  renderTasks();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const task = taskInput.value.trim();
    const date = dateInput.value;
    if (task) {
      tasks.push({ task, date, done: false });
      saveTasks();
      renderTasks();
      form.reset();
    }
  });

  function renderTasks() {
    list.innerHTML = '';
    tasks.forEach((t, i) => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.style.backgroundColor = '#1e1e1e';
      li.style.color = t.done ? '#aaa' : '#fff';
      li.innerHTML = `
        <div>
          <input type="checkbox" ${t.done ? 'checked' : ''} data-index="${i}" class="mr-2">
          <span style="text-decoration: ${t.done ? 'line-through' : 'none'}">${t.task}</span>
          ${t.date ? `<small class="text-muted ml-2">(${t.date})</small>` : ''}
        </div>
        <button data-index="${i}" class="btn btn-sm btn-danger">✖</button>
      `;
      list.appendChild(li);
    });
  }

  list.addEventListener('click', e => {
    const index = e.target.dataset.index;
    if (e.target.type === 'checkbox') {
      tasks[index].done = !tasks[index].done;
    } else if (e.target.tagName === 'BUTTON') {
      tasks.splice(index, 1);
    }
    saveTasks();
    renderTasks();
  });

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});
