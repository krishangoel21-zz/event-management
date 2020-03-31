(function () {
    'use strict';
    let lastId = 0;
    let removeIcon;
    let taskList;
    const btnSave = document.getElementById("btn-submit");
    const addEvent = document.getElementById("add-event");
    const hideModal = document.getElementById("hide-modal");
    const modal = document.getElementById("modal-main");
    const type0fEvent = document.getElementById("type-of-event");
    const table = document.getElementById("table-data");
    const form = document.getElementById("vertical-form");
    const loginBtn = document.getElementById("login-btn");
    const main = document.getElementsByClassName("main");
    const loginPage = document.getElementsByClassName("login-page");
    const options = ["Friend's get-together", "Family outing", "Social gathering", "Local technology meet up"];

    const showForm = function () {
        modal.style.display = 'block';
    }
    addEvent.addEventListener("click", function () {
        showForm()
    });

    const hideForm = function () {
        modal.style.display = 'none';
    }
    hideModal.addEventListener("click", function () {
        hideForm()
    });


    options.forEach(e => {
        var opt = e;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        type0fEvent.appendChild(el);
    })


    function resetForm() {
        form.reset();
    }


    function init() {
        if (!!(window.localStorage.getItem('taskList'))) {
            taskList = JSON.parse(window.localStorage.getItem('taskList'));
        } else {
            taskList = [];
        }
        if (btnSave) {
            btnSave.addEventListener('click', function () {
                saveTask()
            });
            btnSave.addEventListener('click', hideForm);
            showList();
        }

    }

    function showList() {
        if (!!taskList.length) {
            getLastTaskId();
            for (var item in taskList) {
                var task = taskList[item];
                addTaskToList(task);
            }
            syncEvents();
        }
    }

    function saveTask() {
        var task = {
            taskId: lastId,
            eventName: document.getElementById("event-name").value,
            numberOfPpl: document.getElementById("number-of-ppl").value,
            typeOfEvent: document.getElementById("type-of-event").value,
            foodRequirement: document.getElementById("food-requirement").value,
        };
        taskList.push(task);
        resetForm()
        syncTask();
        addTaskToList(task);
        syncEvents();
        lastId++;
    }

    function addTaskToList(e) {
        var row = table.insertRow(-1);
        row.setAttribute("id", e.taskId);
        row.insertCell(0).innerHTML += e.taskId + 1;
        row.insertCell(1).innerHTML += e.eventName;
        row.insertCell(2).innerHTML += e.numberOfPpl;
        row.insertCell(3).innerHTML += e.typeOfEvent;
        row.insertCell(4).innerHTML += e.foodRequirement;
        row.insertCell(5).innerHTML = '<span title="Remove" class="remove_item clickeable">X</span>';
    }

    function removeTask(event) {
        const taskToRemove = event.currentTarget.parentNode.parentNode;
        const taskId = taskToRemove.id;
        const choice = confirm('Do you really want to delete this record?');
        if (choice == true) {
            table.deleteRow(parseInt(taskId) + 1);
            taskList.forEach(function (value, i) {
                if (value.taskId == taskId) {
                    taskList.splice(i, 1);
                }
            })
            syncTask();
            return true;
        }
        else { return false }
    }

    function syncTask() {
        window.localStorage.setItem('taskList', JSON.stringify(taskList));
        taskList = JSON.parse(window.localStorage.getItem('taskList'));
    }

    function getLastTaskId() {
        const lastTask = taskList[taskList.length - 1];
        lastId = lastTask.taskId + 1;
    }

    function syncEvents() {
        removeIcon = document.getElementsByClassName("remove_item");
        if (!!removeIcon.length) {
            for (var i = 0; i < removeIcon.length; i++) {
                removeIcon[i].addEventListener('click', removeTask);
            }
        }
    }
    init();

    function check(form) {
        if (form.user.value != "" && form.pass.value != "") {
            if (form.user.value == "login" && form.pass.value == "123") {
                main[0].style.display = 'block';
                loginPage[0].style.display = 'none';
            }
            else {
                alert("Error Password or Username")
            }
        }
        else {
            alert("Please Enter Username and Password")
        }

    }
    loginBtn.addEventListener("click", function () {
        check(this.form)
    });

})();