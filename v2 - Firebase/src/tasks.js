import { db } from "./firebase";
import { appendTask } from "./ui";

export const fetchTasks = async () => {
  const tasksSnapshot = await db.collection("tasks").get();
  tasksSnapshot.forEach((doc) => {
    appendTask(doc.data().status, doc.data().title, doc.id);
  });
};

export const saveTask = async (sectionId, task) => {
  if (task.trim()) {
    const tasksCol = db.collection("tasks");
    await tasksCol.add({
      title: task,
      status: sectionId,
    });
    appendTask(sectionId, task);
  }
};

export const moveTaskBetweenSections = async (taskId, sectionId) => {
  const taskDocRef = db.collection("tasks").doc(taskId);
  await taskDocRef.update({
    status: sectionId,
  });
};
