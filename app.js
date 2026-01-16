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

let tasks = []; // tasks array
const STORAGE_KEY = "task_manager_tasks"; //key to the local storage


//save Tasks to local Storage
function saveTasksToLocalStorage(){
    localStorage.setItem(STORAGE_KEY, tasks); //key and value for the storage
}


function addTask() {
  const name = taskNameInput.value.trim();
  const category = taskCategoryInput.value.trim();
  const deadline = taskDeadlineInput.value;
  const status = taskStatusSelect.value;

  
  if (name === "") {
    alert("Please enter a task name.");
    return;
  }

  if (category === "") {
    alert("Please enter a category.");
    return;
  }

  // Create task object
  const newTask = {
    id: createId(),
    name: name,
    category: category,
    deadline: deadline,
    status: status
  };
    tasks.push(newTask);

  // Save and re-render
  saveTasksToLocalStorage();
  // Clear inputs
  taskNameInput.value = "";
  taskCategoryInput.value = "";
  taskDeadlineInput.value = "";
  taskStatusSelect.value = "In Progress";
}
//creates unique id to the object in storage
function createId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

addTaskBtn.addEventListener("click", addTask);

console.log(localStorage)
