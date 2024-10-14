import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const registerUser = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);

    alert("Registered succesfully.");
    window.location.replace("/");
  } catch (error) {
    console.error("Error signing up:", error.message);
    alert("Coult not register. Please try again.");
  }
};

export const loginUser = async (email, password) => {
  console.log("logged in")
  try {
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Logged in successfully.");
    window.location.replace("/");
  } catch (error) {
    console.error("Error signing in:", error.message);
    alert("Coult not log you in. Please try again.");
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error.message);
    throw error;
  }
};
