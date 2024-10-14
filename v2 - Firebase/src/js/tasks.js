import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "./firebase";
import { appendTask } from "./ui";

export const fetchTasks = async () => {
  const tasksQuery = query(collection(db, "tasks"), where("userId", "==", auth.currentUser?.uid));
  const tasksSnapshot = await getDocs(tasksQuery);

  tasksSnapshot.forEach((doc) => {
    appendTask(doc.data().status, doc.data().title, doc.id);
  });
};

export const saveTask = async (sectionId, task) => {
  if (task.trim()) {
    const tasksCol = collection(db, "tasks");
    await addDoc(tasksCol, {
      title: task,
      status: sectionId,
      userId: auth.currentUser.uid,
    });
    appendTask(sectionId, task);
  }
};

export const moveTaskBetweenSections = async (taskId, sectionId) => {
  const taskDocRef = doc(db, "tasks", taskId);
  await updateDoc(taskDocRef, {
    status: sectionId,
  });
};
