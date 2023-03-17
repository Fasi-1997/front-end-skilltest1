let tasks = [];
let filteredTasks = [];
const taskList = document.getElementById('todo-list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');
function completeAllTasks() {
    for (i = 0; i < tasks.length; i++) {
        tasks[i].Iscompleted = true;
    }
    renderList(tasks);
}
function addTaskToUI(task) {
    const li = document.createElement('li');
    li.innerHTML = `
    <input type="checkbox" ${task.Iscompleted ? ' checked ' : ''} id="${task.id}" class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src="bin.png" class="delete" data-id="${task.id}" />`
    taskList.append(li);
}
function renderList(todolist) {
    taskList.innerHTML = '';
    for (i = 0; i < todolist.length; i++) {
        addTaskToUI(todolist[i]);
    }
    tasksCounter.innerHTML = todolist.length;
}

function toggletask(taskId) {
    const taskIndex = tasks.findIndex((task => task.id == taskId));
    tasks[taskIndex].Iscompleted = !tasks[taskIndex].Iscompleted;
}
function filterTasks(filter) {
    const newTasks = tasks.filter(function (task) {
        if (filter == 'completed')
            return task.Iscompleted == true;
        else if (filter == 'incomplete')
            return task.Iscompleted == false;
        else return true;
    })
    console.log(newTasks)
    filteredTasks = newTasks;
    renderList(filteredTasks);
    setActiveButton();
}
function deleteTask(taskId) {
    const newTasks = tasks.filter(function (task) {
        return task.id != taskId;
    })
    console.log(newTasks)
    tasks = newTasks;
    renderList(tasks);
    showNotification('Task deleted!!!!');
}
function deleteCompletedTasks() {
    const newTasks = tasks.filter(function (task) {
        return task.Iscompleted != true;
    })
    console.log(newTasks)
    tasks = newTasks;
    renderList(tasks);
    showNotification('Task deleted!!!!');
}
function addTask(task) {
    if (task) {
        tasks.push(task);
        renderList(tasks);
        showNotification('Task added!!!!');
        return;
    }
    showNotification('Task cant be added')
}

function showNotification(message) {
    alert(message);
}
function handleInputKeypress(e) {
    if (e.key === 'Enter') {
        const title = e.target.value;
        if (!title) {
            showNotification('Task cant be empty!!!!');
            return;
        }
        const task = {
            title: title,
            id: tasks.length + 1,
            Iscompleted: false
        }
        addTask(task);
        e.target.value = '';

    }
}
function handleClick(e) {
    const target = e.target;

    if (target.className === 'delete') {
        const taskId = target.dataset.id;
        console.log(taskId);
        deleteTask(taskId);
        return;
    } else if (target.className === 'custom-checkbox') {
        const taskId = target.id;
        toggletask(taskId);
        return;
    } else if (target.className === 'complete-tasks') {
        completeAllTasks();
        renderList(tasks);
        return;
    }
}
function setActiveButton() {
    // Get the container element
    var btnContainer = document.getElementById("btn-group");
    // Get all buttons with class="btn" inside the container
    var btns = btnContainer.getElementsByClassName("btn");
    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
}
addTaskInput.addEventListener('keyup', handleInputKeypress);
document.addEventListener('click', handleClick)