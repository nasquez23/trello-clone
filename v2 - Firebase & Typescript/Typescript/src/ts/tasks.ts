import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { appendTask, removeTask } from "./ui";
import { Task } from "./types";

export const fetchTasks = async (): Promise<void> => {
  if (!auth.currentUser) {
    console.error("User not authenticated.");
    return;
  }

  try {
    const tasksQuery = query(
      collection(db, "tasks"),
      where("userId", "==", auth.currentUser?.uid)
    );
    const tasksSnapshot = await getDocs(tasksQuery);

    tasksSnapshot.forEach((doc) => {
      const task: Task = {
        id: doc.id,
        title: doc.data().title,
        sectionId: doc.data().status,
      };
      appendTask(task);
    });
  } catch (error) {
    alert("Could not fetch tasks.");
  }
};

export const saveTask = async (sectionId: string, taskTitle: string) => {
  try {
    if (taskTitle.trim()) {
      const tasksCol = collection(db, "tasks");
      const docRef = await addDoc(tasksCol, {
        title: taskTitle,
        status: sectionId,
        userId: auth.currentUser?.uid,
      });

      const newTask = {
        id: docRef.id,
        title: taskTitle,
        sectionId,
      };

      appendTask(newTask);
    }
  } catch (error) {
    alert("Could not add task. Please try again.");
  }
};

export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    const taskDoc = doc(db, "tasks", taskId);
    await deleteDoc(taskDoc);

    removeTask(taskId);
  } catch (error) {
    alert("Could not delete task. Please try again.");
  }
};

export const updateTaskTitle = async (
  taskTitle: string,
  taskId: string
): Promise<void> => {
  try {
    const taskDoc = doc(db, "tasks", taskId);
    await updateDoc(taskDoc, {
      title: taskTitle,
    });
  } catch (error) {
    alert("Could not update task title. Please try again.");
  }
};

export const moveTaskBetweenSections = async (
  taskId: string,
  sectionId: string
): Promise<void> => {
  try {
    const taskDocRef = doc(db, "tasks", taskId);
    await updateDoc(taskDocRef, {
      status: sectionId,
    });
  } catch (error) {
    alert("Error while moving task.");
  }
};
