import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { User } from "./types";
import { FirebaseError } from "firebase/app";
import { auth } from "./firebase";

export const registerUser = async (newUser: User): Promise<void> => {
  try {
    await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
  } catch (e) {
    const error = e as FirebaseError;
    if (error.code === "auth/email-already-in-use") {
      error.message = "Email already in use.";
    } else if (error.code === "auth/weak-password") {
      error.message = "Password should be at least 6 characters.";
    } else {
      error.message = "Error while registering. Please try again.";
    }
    throw error;
  }
};

export const loginUser = async (userData: User): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, userData.email, userData.password);
  } catch (e) {
    const error = e as FirebaseError;
    error.message = "Invalid credentials. Please try again.";

    throw error;
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (e) {
    const error = e as FirebaseError;
    error.message = "Error signing out. Please try again.";

    throw error;
  }
};
