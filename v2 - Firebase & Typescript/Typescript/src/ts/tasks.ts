import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  Query,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { appendTask, clearTasks } from "./ui";
import { Task } from "./types";

export const fetchTasks = async (): Promise<void> => {
  if (!auth.currentUser) {
    console.error("User not authenticated.");
    return;
  }

  try {
    const tasksQuery: Query<DocumentData, DocumentData> = query(
      collection(db, "tasks"),
      where("userId", "==", auth.currentUser?.uid)
    );

    onSnapshot(
      tasksQuery,
      (tasksSnapshot: QuerySnapshot<DocumentData, DocumentData>) => {
        clearTasks();

        tasksSnapshot.forEach(
          (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
            const task: Task = {
              id: doc.id,
              title: doc.data().title,
              sectionId: doc.data().status,
            };
            appendTask(task);
          }
        );
      }
    );
  } catch (error) {
    console.error(error);
    alert("Could not fetch tasks.");
  }
};

export const saveTask = async (sectionId: string, taskTitle: string) => {
  try {
    if (taskTitle.trim()) {
      const tasksCol = collection(db, "tasks");
      await addDoc(tasksCol, {
        title: taskTitle,
        status: sectionId,
        userId: auth.currentUser?.uid,
      });
    }
  } catch (error) {
    console.error(error);
    alert("Could not add task. Please try again.");
  }
};

export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    const taskDoc = doc(db, "tasks", taskId);
    await deleteDoc(taskDoc);

  } catch (error) {
    console.error(error);
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
    console.error(error);
    alert("Could not update task title. Please try again.");
  }
};

export const moveTaskBetweenSections = async (
  taskId: string,
  sectionId: string
): Promise<void> => {
  try {
    const taskDoc = doc(db, "tasks", taskId);
    await updateDoc(taskDoc, {
      status: sectionId,
    });
  } catch (error) {
    console.error(error);
    alert("Error while moving task.");
  }
};
