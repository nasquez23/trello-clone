const fetchTasks = () => {
    const sections = ["todo", "inprogress", "done"];

    sections.forEach(section => {
        const tasks = JSON.parse(localStorage.getItem(section)) || [];
        const tasksList = document.getElementById(section + "-list");
        
        tasks.forEach(task => {
            appendTask(tasksList, task);
        });
    });
};

const toggleInputButtons = document.querySelectorAll('.toggle-input-btn');

toggleInputButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.style.display = "none";

        const sectionId = button.id.split("-")[0];
        const inputSection = document.getElementById(sectionId + "-input-section");

        inputSection.style.display = "flex";
        const closeBtn = document.getElementById(sectionId + "-close-btn");

        closeBtn.addEventListener('click', () => closeInputSection(button, inputSection));
        
        addCardBtn = inputSection.querySelector('button');
        addCardBtn.addEventListener('click', () => {
            saveTask(sectionId, inputSection.children[0].value);
            closeInputSection(button, inputSection);
        });
    });
});

const appendTask = (tasksList, task) => {
    const listItem = document.createElement("li");
    listItem.textContent = task;
    tasksList.append(listItem);
};

const saveTask = (sectionId, task) => {
    if (task.trim()) {
        const tasksList = document.getElementById(sectionId + "-list");
        const tasks = JSON.parse(localStorage.getItem(sectionId)) || [];
        tasks.push(task);
        localStorage.setItem(sectionId, JSON.stringify(tasks));
        appendTask(tasksList, task);
    }
};

const closeInputSection = (button, inputSection) => {
    inputSection.children[0].value = "";
    button.style.display = "block";
    inputSection.style.display = "none";
};

document.addEventListener('DOMContentLoaded', fetchTasks);