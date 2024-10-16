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
import { FirebaseError } from "firebase/app";

export const fetchTasks = (): Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    if (!auth.currentUser) {
      console.error("User not authenticated.");
      reject("User not authenticated.");
      return;
    }

    const tasksQuery = query(
      collection(db, "tasks"),
      where("userId", "==", auth.currentUser?.uid)
    );

    const tasks: Task[] = [];

    const unsubscribe = onSnapshot(
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
        resolve(tasks);
      },
      (error) => {
        console.error("Error fetching tasks: ", error);
        reject(error);
      }
    );

    return unsubscribe;
  });
};

export const saveTask = async ({
  sectionId,
  taskTitle,
}: {
  sectionId: string;
  taskTitle: string;
}) => {
  try {
    if (taskTitle.trim()) {
      const tasksCol = collection(db, "tasks");
      await addDoc(tasksCol, {
        title: taskTitle,
        status: sectionId,
        userId: auth.currentUser?.uid,
      });
    }
  } catch (e) {
    const error = e as FirebaseError;
    error.message = "Couldn't save task. Please try again.";

    throw error;
  }
};

export const deleteTask = async ({
  taskId,
}: {
  taskId: string;
}): Promise<void> => {
  try {
    const taskDoc = doc(db, "tasks", taskId);
    await deleteDoc(taskDoc);
  } catch (e) {
    const error = e as FirebaseError;
    error.message = "Couldn't delete task. Please try again.";

    throw error;
  }
};

export const updateTaskTitle = async ({
  taskTitle,
  taskId,
}: {
  taskTitle: string;
  taskId: string;
}): Promise<void> => {
  try {
    const taskDoc = doc(db, "tasks", taskId);
    await updateDoc(taskDoc, {
      title: taskTitle,
    });
  } catch (e) {
    const error = e as FirebaseError;
    error.message = "Couldn't update task title. Please try again.";

    throw error;
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
