const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    const taskText = inputBox.value.trim();

    if (taskText === "") {
        alert("You must write something!");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
        <input type="checkbox">
        <label>${taskText}</label>
        <button onclick="deleteTask(this)">Delete</button>
    `;

    listContainer.appendChild(li);
    inputBox.value = "";
    saveData();
}

function deleteTask(button) {
    const listItem = button.parentElement;
    listItem.remove();
    saveData();
}

function saveData() {
    const tasks = [];
    const taskItems = listContainer.querySelectorAll("li");

    taskItems.forEach((taskItem) => {
        const label = taskItem.querySelector("label");
        const isChecked = label.classList.contains("checked");
        tasks.push({
            text: label.textContent,
            checked: isChecked,
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTask() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (storedTasks) {
        storedTasks.forEach((task) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <input type="checkbox" ${task.checked ? "checked" : ""}>
                <label class="${task.checked ? "checked" : ""}">${task.text}</label>
                <button onclick="deleteTask(this)">Delete</button>
            `;

            listContainer.appendChild(li);
        });
    }
}

showTask();
   