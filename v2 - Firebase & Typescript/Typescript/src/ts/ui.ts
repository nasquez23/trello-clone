import { Task, User } from "./types";
import { loginUser, registerUser, signOutUser } from "./auth";
import {
  deleteTask,
  moveTaskBetweenSections,
  saveTask,
  updateTaskTitle,
} from "./tasks";

const toggleInputButtons = document.querySelectorAll(".toggle-input-btn");

toggleInputButtons.forEach((btn: Element) => {
  const button = btn as HTMLButtonElement;
  button.addEventListener("click", () => {
    const sectionId = button.id.split("-")[0];
    const inputSection = document.getElementById(
      `${sectionId}-input-section`
    ) as HTMLDivElement;
    button.style.display = "none";
    inputSection.style.display = "flex";

    const closeBtn = document.getElementById(
      `${sectionId}-close-btn`
    ) as HTMLButtonElement;
    closeBtn.addEventListener("click", () =>
      closeInputSection(button, inputSection)
    );

    const addCardBtn = inputSection.querySelector(
      "button"
    ) as HTMLButtonElement;
    addCardBtn.addEventListener("click", () => {
      const inputField = inputSection.children[0] as HTMLInputElement;
      saveTask(sectionId, inputField.value);
      closeInputSection(button, inputSection);
    });
  });
});

const tasksLists = document.querySelectorAll(".sections");

tasksLists.forEach((list) => {
  const taskList = list as HTMLDivElement;
  taskList.addEventListener("dragover", (e: DragEvent) => {
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
      moveTaskBetweenSections(
        draggableTask.getAttribute("data-id") as string,
        sectionId
      );
    }
  });
});

const closeInputSection = (
  button: HTMLButtonElement,
  inputSection: HTMLDivElement
): void => {
  const inputField = inputSection.children[0] as HTMLInputElement;
  inputField.value = "";
  button.style.display = "block";
  inputSection.style.display = "none";
};

export const appendTask = (task: Task): void => {
  const listItem = document.createElement("div");
  const tasksList = document.getElementById(
    `${task.sectionId}-list`
  ) as HTMLDivElement;
  const taskTitle = document.createElement("span");
  taskTitle.textContent = task.title;
  listItem.appendChild(taskTitle);
  listItem.setAttribute("draggable", "true");
  listItem.setAttribute("data-id", task.id);
  listItem.setAttribute("section", task.sectionId);
  listItem.classList.add("draggable");

  const updateInput = document.createElement("input");
  updateInput.classList.add("update-input");

  const updateButton = document.createElement("button");
  updateButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  updateButton.classList.add("update-btn");

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.classList.add("delete-btn");

  const actionButtonsDiv = document.createElement("div");
  actionButtonsDiv.appendChild(updateButton);
  actionButtonsDiv.appendChild(deleteButton);

  const updateActionButtonsDiv = document.createElement("div");
  updateActionButtonsDiv.classList.add("update-action-btns");
  const confirmUpdateButton = document.createElement("button");
  confirmUpdateButton.textContent = "Save Task";
  confirmUpdateButton.classList.add("confirm-update-btn");
  const cancelUpdateButton = document.createElement("button");
  cancelUpdateButton.textContent = "Cancel";
  cancelUpdateButton.classList.add("cancel-update-btn");
  updateActionButtonsDiv.appendChild(confirmUpdateButton);
  updateActionButtonsDiv.appendChild(cancelUpdateButton);

  const taskUpdatingDiv = document.createElement("div");
  taskUpdatingDiv.appendChild(updateInput);
  taskUpdatingDiv.appendChild(updateActionButtonsDiv);

  const removeTaskUpdatingContent = () => {
    taskUpdatingDiv.remove();
    listItem.appendChild(taskTitle);
    listItem.classList.remove("updating");
  };

  confirmUpdateButton.addEventListener("click", () => {
    updateTaskTitle(updateInput.value, task.id);
    taskTitle.textContent = updateInput.value;
    removeTaskUpdatingContent();
  });

  cancelUpdateButton.addEventListener("click", removeTaskUpdatingContent);

  listItem.addEventListener("mouseenter", () => {
    if (!listItem.classList.contains("updating")) {
      listItem.appendChild(actionButtonsDiv);
    }
  });

  listItem.addEventListener("mouseleave", () => {
    actionButtonsDiv.remove();
  });

  updateButton.addEventListener("click", () => {
    listItem.appendChild(taskUpdatingDiv);
    listItem.classList.add("updating");
    actionButtonsDiv.remove();
    updateInput.value = task.title;
    taskTitle.remove();
  });

  deleteButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id);
    }
  });

  if (tasksList) {
    tasksList.appendChild(listItem);
  }

  listItem.addEventListener("dragstart", () => {
    listItem.classList.add("dragging");
  });

  listItem.addEventListener("dragend", () => {
    listItem.classList.remove("dragging");
  });
};

export const removeTask = (taskId: string): void => {
  const taskEl = document.querySelector(
    `[data-id=${taskId}]`
  ) as HTMLDivElement;
  taskEl?.remove();
};

const registerForm = document.getElementById(
  "register-form"
) as HTMLFormElement;
const loginForm = document.getElementById("login-form") as HTMLFormElement;

if (registerForm) {
  registerForm.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData) as {
      email: string;
      password: string;
    };
    const newUser: User = {
      email: data.email,
      password: data.password,
    };

    await registerUser(newUser);
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData) as {
      email: string;
      password: string;
    };
    const userData: User = {
      email: data.email,
      password: data.password,
    };

    await loginUser(userData);
  });
}

const logoutButton = document.getElementById("logout-btn") as HTMLButtonElement;

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    signOutUser();
    alert("You have succesfully signed out.");
  });
}
