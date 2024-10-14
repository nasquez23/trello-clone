import { loginUser, registerUser, signOutUser } from "./auth";
import { moveTaskBetweenSections, saveTask } from "./tasks";

export interface Task {
  id: string,
  title: string,
  sectionId: string
}

const toggleInputButtons = document.querySelectorAll(".toggle-input-btn");

toggleInputButtons.forEach((btn: Element) => {
  const button = btn as HTMLButtonElement;
  button.addEventListener("click", () => {
    const sectionId = button.id.split("-")[0];
    const inputSection = document.getElementById(`${sectionId}-input-section`) as HTMLDivElement;
    button.style.display = "none";
    inputSection.style.display = "flex";

    const closeBtn = document.getElementById(`${sectionId}-close-btn`) as HTMLButtonElement;
    closeBtn.addEventListener("click", () =>
      closeInputSection(button, inputSection)
    );

    const addCardBtn = inputSection.querySelector("button") as HTMLButtonElement;
    addCardBtn.addEventListener("click", () => {
      const inputField = inputSection.children[0] as HTMLInputElement;
      saveTask(sectionId, inputField.value);
      closeInputSection(button, inputSection);
    });
  });
});

const tasksLists = document.querySelectorAll(".sections");

tasksLists.forEach((taskList) => {
  taskList.addEventListener("dragover", (e) => {
    e.preventDefault();

    taskList.classList.add("dragover");
    const draggableTask = document.querySelector(".dragging") as HTMLDivElement;
    taskList.children[1].appendChild(draggableTask);
  });

  taskList.addEventListener("dragleave", () => {
    taskList.classList.remove("dragover");
  });

  taskList.addEventListener("drop", () => {
    taskList.classList.remove("dragover");
    const draggableTask = document.querySelector(".dragging") as HTMLDivElement;
    if (!draggableTask) return;

    const sectionId = taskList.id.split("-")[0];
    if (sectionId !== draggableTask.getAttribute("section")) {
      moveTaskBetweenSections(draggableTask.getAttribute("data-id") as string, sectionId);
    }
  });
});

const closeInputSection = (button: HTMLButtonElement, inputSection: HTMLDivElement) => {
  const inputField = inputSection.children[0] as HTMLInputElement;
  inputField.value = "";
  button.style.display = "block";
  inputSection.style.display = "none";
};

export const appendTask = (task: Task) => {
  const listItem = document.createElement("div");
  const tasksList = document.getElementById(`${task.sectionId}-list`) as HTMLDivElement;
  listItem.textContent = task.title;
  listItem.setAttribute("draggable", "true");
  listItem.setAttribute("data-id", task.id);
  listItem.setAttribute("section", task.sectionId);
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

const registerForm = document.getElementById("register-form") as HTMLFormElement;
const loginForm = document.getElementById("login-form") as HTMLFormElement;

if (registerForm) {
  registerForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    await registerUser(data.email as string, data.password as string);
  });
}

if (loginForm){
  loginForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    await loginUser(data.email as string, data.password as string);
  });
}

const logoutButton = document.getElementById("logout-btn") as HTMLButtonElement;

if (logoutButton){
  logoutButton.addEventListener("click", () => {
    signOutUser();
    alert("You have succesfully signed out.");
  });
}