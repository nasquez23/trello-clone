import { fetchTasks } from "./tasks";
import "./styles.css";
import { auth } from "./firebase";

document.addEventListener("DOMContentLoaded", () => {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "login.html";
    } else {
      fetchTasks();
    }
  });
});
