document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.querySelector(".add_task");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.querySelector(".task_list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", function () {
                tasks[index].completed = checkbox.checked;
                saveTasks();
            });

            const label = document.createElement("label");
            label.innerText = task.text;

            const deleteButton = document.createElement("button");
            deleteButton.className = "deleteTask";
            deleteButton.innerText = "Delete";
            deleteButton.addEventListener("click", function () {
                tasks.splice(index, 1);
                saveTasks();
            });

            li.appendChild(checkbox);
            li.appendChild(label);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }

    addTaskButton.addEventListener("click", function () {
        const newTaskText = taskInput.value.trim();
        if (newTaskText !== "") {
            tasks.push({ text: newTaskText, completed: false });
            saveTasks();
            taskInput.value = "";
        }
    });

    renderTasks();
});