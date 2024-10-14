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
import { appendTask, removeTask, Task } from "./ui";

export const fetchTasks = async () => {
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
};

export const saveTask = async (sectionId: string, task: string) => {
  if (task.trim()) {
    const tasksCol = collection(db, "tasks");
    const docRef = await addDoc(tasksCol, {
      title: task,
      status: sectionId,
      userId: auth.currentUser?.uid,
    });

    const newTask = {
      id: docRef.id,
      title: task,
      sectionId,
    };
    appendTask(newTask);
  }
};

export const deleteTask = async (taskId: string) => {
  const taskDoc = doc(db, "tasks", taskId);
  await deleteDoc(taskDoc);

  removeTask(taskId);
};

export const updateTaskTitle = async (taskTitle: string, taskId: string) => {
  const taskDoc = doc(db, "tasks", taskId);
  await updateDoc(taskDoc, {
    title: taskTitle
  });
};

export const moveTaskBetweenSections = async (
  taskId: string,
  sectionId: string
) => {
  const taskDocRef = doc(db, "tasks", taskId);
  await updateDoc(taskDocRef, {
    status: sectionId,
  });
};
