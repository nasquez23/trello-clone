const toggleInputButtons = document.querySelectorAll('.toggle-input-btn');

const fetchTasks = () => {
    console.log('asfas')
    const sections = ["todo", "inprogress", "done"];
    sections.forEach(section => {
        const tasks = JSON.parse(localStorage.getItem(section)) || [];
        const tasksList = document.getElementById(section + "-list");

        tasks.forEach(task => {
            const listItem = document.createElement("li");
            listItem.textContent = task;
            tasksList.append(listItem);
        });
    });
};

toggleInputButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.style.display = "none";
        const sectionId = button.id.split("-")[0];
        const inputSection = document.getElementById(sectionId + "-input-section");

        inputSection.style.display = "flex";
        const closeBtn = document.getElementById(sectionId + "-close-btn");

        closeBtn.addEventListener('click', () => {
            closeInputSection(button, inputSection);
        });
        
        addCardBtn = inputSection.querySelector('button');
        addCardBtn.addEventListener('click', () => {
            saveTask(sectionId, inputSection.children[0].value);
            inputSection.children[0].value = "";
            closeInputSection(button, inputSection);
        });
    });
});

const closeInputSection = (button, inputSection) => {
    button.style.display = "block";
    inputSection.style.display = "none";
};

const saveTask = (sectionId, task) => {
    const tasks = JSON.parse(localStorage.getItem(sectionId)) || [];
    tasks.push(task);
    localStorage.setItem(sectionId, JSON.stringify(tasks));
};

document.addEventListener('DOMContentLoaded', fetchTasks);