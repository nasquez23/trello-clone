import { fetchTasks } from "./tasks";
import "../styles/styles.css";
import { auth } from "./firebase";

document.addEventListener("DOMContentLoaded", () => {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      if (window.location.pathname === "/index.html") {
        window.location.href = "login.html";
      }
    } else {
      fetchTasks();
    }
  });
});
