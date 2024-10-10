import { moveTaskBetweenSections, saveTask } from "./tasks";

const toggleInputButtons = document.querySelectorAll(".toggle-input-btn");

toggleInputButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const sectionId = button.id.split("-")[0];
    const inputSection = document.getElementById(`${sectionId}-input-section`);
    button.style.display = "none";
    inputSection.style.display = "flex";

    const closeBtn = document.getElementById(`${sectionId}-close-btn`);
    closeBtn.addEventListener("click", () =>
      closeInputSection(button, inputSection)
    );

    const addCardBtn = inputSection.querySelector("button");
    addCardBtn.addEventListener("click", () => {
      const task = inputSection.children[0].value;
      saveTask(sectionId, task);
      closeInputSection(button, inputSection);
    });
  });
});

const tasksLists = document.querySelectorAll(".sections");

tasksLists.forEach((taskList) => {
  taskList.addEventListener("dragover", (e) => {
    e.preventDefault();

    taskList.classList.add("dragover");
    const draggableTask = document.querySelector(".dragging");
    taskList.children[1].appendChild(draggableTask);
  });

  taskList.addEventListener("dragleave", () => {
    taskList.classList.remove("dragover");
  });

  taskList.addEventListener("drop", (e) => {
    taskList.classList.remove("dragover");
    const draggableTask = document.querySelector(".dragging");
    if (!draggableTask) return;

    const sectionId = taskList.id.split("-")[0];
    if (sectionId !== draggableTask.getAttribute("section")) {
      moveTaskBetweenSections(draggableTask.getAttribute("data-id"), sectionId);
    }
  });
});

const closeInputSection = (button, inputSection) => {
  inputSection.children[0].value = "";
  button.style.display = "block";
  inputSection.style.display = "none";
};

export const appendTask = (sectionId, task, taskId) => {
  const listItem = document.createElement("div");
  const tasksList = document.getElementById(`${sectionId}-list`);
  listItem.textContent = task;
  listItem.setAttribute("draggable", "true");
  listItem.setAttribute("data-id", taskId);
  listItem.setAttribute("section", sectionId);
  listItem.classList.add("draggable");
  tasksList.append(listItem);

  listItem.addEventListener("dragstart", () => {
    listItem.classList.add("dragging");
  });

  listItem.addEventListener("dragend", () => {
    listItem.classList.remove("dragging");
  });
};
