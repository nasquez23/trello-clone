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
import { Task } from "./types";

export const fetchTasks = async (): Promise<Task[]> => {
  console.log(auth.currentUser);
  if (!auth.currentUser) {
    console.error("User not authenticated.");
    return [];
  }

  try {
    const tasksQuery = query(
      collection(db, "tasks"),
      where("userId", "==", auth.currentUser?.uid)
    );

    const tasks: Task[] = [];

    await new Promise<void>((resolve, reject) => {
      onSnapshot(
        tasksQuery,
        (tasksSnapshot: QuerySnapshot<DocumentData, DocumentData>) => {
          tasksSnapshot.forEach((doc) => {
            const task: Task = {
              id: doc.id,
              title: doc.data().title,
              sectionId: doc.data().status,
            };
            tasks.push(task);
          });
          resolve();
        },
        (error) => {
          console.error("Error fetching tasks: ", error);
          reject(error);
        }
      );
    });

    return tasks;
  } catch (error) {
    console.error(error);
    return [];
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
