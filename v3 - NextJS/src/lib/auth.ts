import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";
import { User } from "./types";
import { FirebaseError } from "firebase/app";

export const registerUser = async (newUser: User): Promise<void> => {
  try {
    await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);

    alert("Registered succesfully.");
    window.location.replace("/");
  } catch (e) {
    const error = e as FirebaseError;
    if (error.code === "auth/email-already-in-use") {
      alert("This email is already in use. Please try another one.");
    } else if (error.code === "auth/weak-password") {
      alert("The password is too weak. Please choose a stronger password.");
    } else {
      console.error("Error signing up:", error.message);
      alert("Could not register. Please try again.");
    }
  }
};

export const loginUser = async (userData: User): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, userData.email, userData.password);

    alert("Logged in successfully.");
    window.location.replace("/");
  } catch (e) {
    const error = e as FirebaseError;
    console.error("Error signing in:", error.message);
    alert("Coult not log you in. Please try again.");
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (e) {
    const error = e as FirebaseError;
    console.error("Error signing out:", error.message);
    alert("Could not log you out. Please try again.");
  }
};
