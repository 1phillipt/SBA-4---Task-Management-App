const taskNameInput = document.getElementById("taskName");
const taskCategoryInput = document.getElementById("taskCategory");
const taskDeadlineInput = document.getElementById("taskDeadline");
const taskStatusSelect = document.getElementById("taskStatus");
const addTaskBtn = document.getElementById("addTaskBtn");

const taskTableBody = document.getElementById("taskTableBody");
const emptyMessage = document.getElementById("emptyMessage");

const statusFilter = document.getElementById("statusFilter");
const categoryFilter = document.getElementById("categoryFilter");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");

let tasks = [];
const STORAGE_KEY = "task_manager_tasks";

// SAVE
function saveTasksToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// LOAD
function loadTasksFromLocalStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    tasks = JSON.parse(data);
  }
}

function createId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

function addTask() {
  const name = taskNameInput.value.trim();
  const category = taskCategoryInput.value.trim();
  const deadline = taskDeadlineInput.value;
  const status = taskStatusSelect.value;

  if (name === "" || category === "") {
    alert("Please fill out all fields");
    return;
  }

  const newTask = {
    id: createId(),
    name,
    category,
    deadline,
    status
  };

  tasks.push(newTask);
  saveTasksToLocalStorage();

  taskNameInput.value = "";
  taskCategoryInput.value = "";
  taskDeadlineInput.value = "";
  taskStatusSelect.value = "In Progress";
}

addTaskBtn.addEventListener("click", addTask);

// Load tasks when page opens
loadTasksFromLocalStorage();

console.log(tasks);
