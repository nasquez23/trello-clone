import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "./firebase";
import { appendTask, Task } from "./ui";

export const fetchTasks = async () => {
  const tasksQuery = query(collection(db, "tasks"), where("userId", "==", auth.currentUser?.uid));
  const tasksSnapshot = await getDocs(tasksQuery);

  tasksSnapshot.forEach((doc) => {
    const task: Task = {
      id: doc.id,
      title: doc.data().title,
      sectionId: doc.data().status
    }
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
      sectionId
    };
    appendTask(newTask);
  }
};

export const moveTaskBetweenSections = async (taskId: string, sectionId: string) => {
  const taskDocRef = doc(db, "tasks", taskId);
  await updateDoc(taskDocRef, {
    status: sectionId,
  });
};
