import { loginUser, registerUser, signOutUser } from "./auth.js";
import { moveTaskBetweenSections, saveTask } from "./tasks.js";

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

  if (tasksList) {
    tasksList.append(listItem);
  }

  listItem.addEventListener("dragstart", () => {
    listItem.classList.add("dragging");
  });

  listItem.addEventListener("dragend", () => {
    listItem.classList.remove("dragging");
  });
};

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    await registerUser(data.email, data.password);
  });
}

if (loginForm){
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    await loginUser(data.email, data.password);
  });
}

const logoutButton = document.getElementById("logout-btn");

if (logoutButton){
  logoutButton.addEventListener("click", () => {
    signOutUser();
    alert("You have succesfully signed out.");
  });
}