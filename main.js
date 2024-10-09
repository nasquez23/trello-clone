let previousSection = '';

const fetchTasks = () => {
    const sections = ["todo", "inprogress", "done"];
    sections.forEach(section => {
        const tasks = JSON.parse(localStorage.getItem(section)) || [];
        const tasksList = document.getElementById(`${section}-list`);
        tasks.forEach(task => appendTask(tasksList, task));
    });
};

const toggleInputButtons = document.querySelectorAll('.toggle-input-btn');

toggleInputButtons.forEach(button => {
    button.addEventListener('click', () => {
        const sectionId = button.id.split("-")[0];
        const inputSection = document.getElementById(`${sectionId}-input-section`);
        button.style.display = "none";
        inputSection.style.display = "flex";

        const closeBtn = document.getElementById(`${sectionId}-close-btn`);
        closeBtn.addEventListener('click', () => closeInputSection(button, inputSection));

        const addCardBtn = inputSection.querySelector('button');
        addCardBtn.addEventListener('click', () => {
            const task = inputSection.children[0].value;
            saveTask(sectionId, task);
            closeInputSection(button, inputSection);
        });
    });
});

const tasksLists = document.querySelectorAll('.sections');

tasksLists.forEach(taskList => {
    taskList.addEventListener('dragover', (e) => {
        e.preventDefault();
        
        taskList.classList.add("dragover");
        const draggableTask = document.querySelector('.dragging');
        taskList.children[1].appendChild(draggableTask);
    });

    taskList.addEventListener('dragleave', () => {
        taskList.classList.remove("dragover");
    });

    taskList.addEventListener('drop', (e) => {
        taskList.classList.remove("dragover");
        const draggableTask = document.querySelector('.dragging');
        if (!draggableTask) return;

        const sectionId = taskList.id.split("-")[0];
        if (sectionId !== previousSection) {
            moveTaskBetweenSections(draggableTask, sectionId);
        }
    });
});

const appendTask = (tasksList, task) => {
    const listItem = document.createElement("div");
    listItem.textContent = task;
    listItem.setAttribute("draggable", "true");
    listItem.classList.add("draggable");
    tasksList.append(listItem);

    listItem.addEventListener("dragstart", () => {
        listItem.classList.add("dragging");
        previousSection = listItem.parentElement.id.split("-")[0];
    });

    listItem.addEventListener("dragend", () => {
        listItem.classList.remove("dragging");
    });
};

const saveTask = (sectionId, task) => {
    if (task.trim()) {
        const tasksList = document.getElementById(`${sectionId}-list`);
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

const moveTaskBetweenSections = (task, newSectionId) => {
    const newTasks = JSON.parse(localStorage.getItem(newSectionId)) || [];
    newTasks.push(task.textContent);
    localStorage.setItem(newSectionId, JSON.stringify(newTasks));

    const previousTasks = JSON.parse(localStorage.getItem(previousSection)) || [];
    const updatedPreviousTasks = previousTasks.filter(t => t !== task.textContent);
    localStorage.setItem(previousSection, JSON.stringify(updatedPreviousTasks));

    const newSectionList = document.getElementById(`${newSectionId}-list`);
    newSectionList.appendChild(task);
};

document.addEventListener('DOMContentLoaded', fetchTasks);
