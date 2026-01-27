//element by Ids
const taskNameInput = document.getElementById("taskName");
const taskCategoryInput = document.getElementById("taskCategory");
const taskDeadlineInput = document.getElementById("taskDeadline");
const taskStatusSelect = document.getElementById("taskStatus");
const addTaskBtn = document.getElementById("addTaskBtn");


const taskTableBody = document.getElementById("taskTableBody");


const statusFilter = document.getElementById("statusFilter");
const categoryFilter = document.getElementById("categoryFilter");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");


let tasks = [];
const STORAGE_KEY = "task_manager_tasks";


function loadTasks() {
  const data = localStorage.getItem(STORAGE_KEY);
  tasks = data ? JSON.parse(data) : [];
}

// saves task in local storage
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// saves the tasks
function addTask() {
  const name = taskNameInput.value.trim();
  const category = taskCategoryInput.value.trim();
  const deadline = taskDeadlineInput.value;
  const status = taskStatusSelect.value;

  if (!name || !category || !deadline) {
    alert("Please fill out all fields");
    return;
  }

  tasks.push({
    id: Date.now(),
    name,
    category,
    deadline,
    status
  });

  saveTasks();
  renderTasks();
  clearForm();
}


function clearForm() {
  taskNameInput.value = "";
  taskCategoryInput.value = "";
  taskDeadlineInput.value = "";
  taskStatusSelect.value = "In Progress";
}


function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}


function renderTasks() {
  taskTableBody.innerHTML = "";

  let filteredTasks = tasks;

  
  if (statusFilter.value !== "All") {
    filteredTasks = filteredTasks.filter(
      task => task.status === statusFilter.value
    );
  }

 
  if (categoryFilter.value) {
    filteredTasks = filteredTasks.filter(task =>
      task.category.toLowerCase().includes(categoryFilter.value.toLowerCase())
    );
  }

  const today = new Date().toISOString().split("T")[0];

  filteredTasks.forEach(task => {
    if (task.status !== "Completed" && task.deadline < today) {
      task.status = "Overdue";
    }

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${task.name}</td>
      <td>${task.category}</td>
      <td>${task.deadline}</td>
      <td>${task.status}</td>
      <td>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </td>
    `;

    taskTableBody.appendChild(row);
  });

  saveTasks();
}

//events here
addTaskBtn.addEventListener("click", addTask);

statusFilter.addEventListener("change", renderTasks);

categoryFilter.addEventListener("input", renderTasks);

clearFiltersBtn.addEventListener("click", () => {
  statusFilter.value = "All";
  categoryFilter.value = "";
  renderTasks();
});


loadTasks();
renderTasks();
