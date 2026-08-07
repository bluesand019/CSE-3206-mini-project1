const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const totalCount = document.getElementById('totalCount');
const activeCount = document.getElementById('activeCount');
const completedCount = document.getElementById('completedCount');
const filterButtons = document.querySelectorAll('.filter-btn');

let tasks = JSON.parse(localStorage.getItem('focusflow-tasks') || '[]');
let currentFilter = 'all';

function saveTasks() {
  localStorage.setItem('focusflow-tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const visibleTasks = tasks.filter((task) => {
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  taskList.innerHTML = '';

  if (visibleTasks.length === 0) {
    taskList.innerHTML = `
      <div class="rounded-2xl border border-dashed border-white/10 bg-slate-800/60 p-6 text-center text-sm text-slate-400">
        No tasks here yet. Add one to get started.
      </div>
    `;
  } else {
    visibleTasks.forEach((task) => {
      const item = document.createElement('div');
      item.className = `flex items-center justify-between rounded-2xl border px-4 py-3 ${task.completed ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-white/10 bg-slate-800/80'}`;

      item.innerHTML = `
        <label class="flex flex-1 cursor-pointer items-center gap-3">
          <input class="h-4 w-4 rounded border-white/20 bg-slate-900 accent-brand-500" type="checkbox" ${task.completed ? 'checked' : ''} data-action="toggle" data-id="${task.id}" />
          <span class="text-sm ${task.completed ? 'text-slate-400 line-through' : 'text-slate-100'}">${task.text}</span>
        </label>
        <button class="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-rose-300" data-action="delete" data-id="${task.id}">✕</button>
      `;

      taskList.appendChild(item);
    });
  }

  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const active = total - completed;

  taskCount.textContent = `${total} task${total === 1 ? '' : 's'}`;
  totalCount.textContent = total;
  activeCount.textContent = active;
  completedCount.textContent = completed;
}

function updateFilter(nextFilter) {
  currentFilter = nextFilter;
  filterButtons.forEach((button) => {
    const active = button.dataset.filter === nextFilter;
    button.className = `filter-btn rounded-full border px-3 py-2 text-sm font-medium ${active ? 'border-brand-500/30 bg-brand-500/15 text-brand-100' : 'border-white/10 bg-slate-900 text-slate-400'}`;
  });
  renderTasks();
}

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = taskInput.value.trim();

  if (!text) return;

  tasks.unshift({
    id: Date.now(),
    text,
    completed: false
  });

  saveTasks();
  taskInput.value = '';
  renderTasks();
});

taskList.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  const checkbox = event.target.closest('input[type="checkbox"]');

  if (button) {
    const id = Number(button.dataset.id);
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    renderTasks();
  }

  if (checkbox) {
    const id = Number(checkbox.dataset.id);
    tasks = tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task));
    saveTasks();
    renderTasks();
  }
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => updateFilter(button.dataset.filter));
});

updateFilter(currentFilter);
renderTasks();
