import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Excluded firebaseConfig for security reasons

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const fetchTasks = async () => {
  const tasksSnapshot = await getDocs(collection(db, "tasks"));
  tasksSnapshot.forEach((doc) => {
    appendTask(doc.data().status, doc.data().title, doc.id);
  });
};

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

const saveTask = async (sectionId, task) => {
  if (task.trim()) {
    const tasksCol = collection(db, "tasks");
    await addDoc(tasksCol, {
      title: task,
      status: sectionId,
    });
    appendTask(sectionId, task);
  }
};

const closeInputSection = (button, inputSection) => {
  inputSection.children[0].value = "";
  button.style.display = "block";
  inputSection.style.display = "none";
};

const appendTask = (sectionId, task, taskId) => {
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

const moveTaskBetweenSections = async (taskId, sectionId) => {
  const taskDocRef = doc(db, "tasks", taskId);
  await updateDoc(taskDocRef, {
    status: sectionId,
  });
};

document.addEventListener("DOMContentLoaded", fetchTasks);
