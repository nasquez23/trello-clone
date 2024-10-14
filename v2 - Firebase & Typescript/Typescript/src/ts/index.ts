import { fetchTasks } from "./tasks";
import "../styles/styles.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
        window.location.replace("login.html");
      }
    } else {
      fetchTasks();
    }
  });
});
