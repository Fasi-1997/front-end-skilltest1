let tasks = [];
let filteredTasks = [];
const taskList = document.getElementById('todo-list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');
const addTaskIcon = document.getElementById('add-icon');

//This metod masrks all the task as completed
function completeAllTasks() {
    for (i = 0; i < tasks.length; i++) {
        tasks[i].IsCompleted = true;
    }
    renderList(tasks);
    clearFilter();
    showNotification('Marked all task as complete.');
}

function addTaskToUI(task) {
    const li = document.createElement('li');
    li.innerHTML = `
    <input type="checkbox" ${task.IsCompleted ? ' checked ' : ''} id="${task.id}" class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src="Assets/close.png" class="delete" data-id="${task.id}" />`
    taskList.append(li);
}

function renderList(todolist) {
    taskList.innerHTML = '';
    for (i = 0; i < todolist.length; i++) {
        addTaskToUI(todolist[i]);
    }
    tasksCounter.innerHTML = todolist.length;
}

//Toggles IsComplete flage for a given task id
function toggletask(taskId) {
    const taskIndex = tasks.findIndex((task => task.id == taskId));
    tasks[taskIndex].IsCompleted = !tasks[taskIndex].IsCompleted;
    renderList(tasks);
    clearFilter();
}
//This method filters tasks; filter options are All, incomplete and complete 
function filterTasks(filter) {
    const newTasks = tasks.filter(function (task) {
        if (filter == 'completed')
            return task.IsCompleted == true;
        else if (filter == 'incomplete')
            return task.IsCompleted == false;
        else return true;
    })
    filteredTasks = newTasks;
    renderList(filteredTasks);
    setActiveButton();
}
//This metod deletes the task for given task id
function deleteTask(taskId) {
    const newTasks = tasks.filter(function (task) {
        return task.id !== taskId;
    })
    tasks = newTasks;
    renderList(tasks);
    clearFilter();
    showNotification('Task deleted.');
}

// This method marks the completed task as incomplete
function clearCompletedTasks() {
    const completedTasks = tasks.filter(function (task) {
        return task.IsCompleted == true;
    })
    if (completedTasks.length == 0) {
        showNotification('There are no completed tasks.');
        return;
    }

    for (i = 0; i < completedTasks.length; i++) {
        const taskIndex = tasks.findIndex((task => task.id == completedTasks[i].id));
        tasks[taskIndex].IsCompleted = false;
    }
    renderList(tasks);
    clearFilter();
    showNotification('Cleared completed tasks.');
}
// this method adds task 
function addTask() {
    const title = addTaskInput.value;
    if (!title) {
        showNotification('Task cant be empty.');
        return;
    }
    const task = {
        title: title,
        id: Date.now().toString(),
        IsCompleted: false
    }
    addTaskInput.value = '';
    tasks.push(task);
    renderList(tasks);
    clearFilter();
    toggleButton();
    showNotification('Task added.');
    return;
}

function showNotification(message) {
    alert(message);
}
//This method is used to toggle the add taskk icon; icon will show only if title has some text
function toggleButton() {
    if (addTaskInput.value === "") {
        addTaskIcon.style.display = "none";
    } else {
        addTaskIcon.style.display = "block";
    }
}
//Event delegation for delete and toggle IsCompleted  
function handleClick(e) {
    const target = e.target;
    if (target.className === 'delete') {
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    } else if (target.className === 'custom-checkbox') {
        const taskId = target.id;
        toggletask(taskId);
        return;
    }
}
// This method clears the filter; this method is called whenever a change happens to task list
function clearFilter() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    var allFilter = document.getElementById("all");
    allFilter.className += " active";
}
//This method will be used to set active button when a filter is selected
function setActiveButton() {
    var btnContainer = document.getElementById("btn-group");
    var btns = btnContainer.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
}
document.addEventListener('click', handleClick)