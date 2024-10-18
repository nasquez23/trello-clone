import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { User } from "./types";
import { FirebaseError } from "firebase/app";
import { auth } from "./firebase";
import { deleteOldProfilePicture, uploadFileToStorage } from "./storage";

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

export const signInWithGoogle = async (): Promise<void> => {
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
  } catch (error) {
    throw new Error("Google Sign In failed. Please try again.");
  }
};

export const signInWithGithub = async (): Promise<void> => {
  try {
    await signInWithPopup(auth, new GithubAuthProvider());
  } catch (error) {
    throw new Error("Github Sign In failed. Please try again.");
  }
};

export const updateUserProfile = async (name: string) => {
  const user = auth.currentUser;

  if (!user) throw new Error("User is not logged in.");

  try {
    await updateProfile(user, {
      displayName: name,
    });
  } catch (e) {
    const error = e as FirebaseError;
    error.message = "Couldn't update your profile. Please try again.";

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

export const verifyUserEmail = async (): Promise<void> => {
  const user = auth.currentUser;

  if (!user) throw new Error("User is not logged in.");

  try {
    await sendEmailVerification(user);
  } catch (e) {
    const error = e as FirebaseError;
    error.message = "Error sending verification email. Please try again.";

    throw error;
  }
};

export const changeProfilePicture = async (file: File): Promise<void> => {
  const user = auth.currentUser;

  if (!user) throw new Error("User is not logged in.");

  try {
    const oldPhotoURL = user.photoURL;
    if (oldPhotoURL) {
      await deleteOldProfilePicture(oldPhotoURL);
    }
    
    const photoURL = await uploadFileToStorage(file);

    await updateProfile(user, {
      photoURL,
    });
  } catch (e) {
    const error = e as FirebaseError;
    error.message = "Couldn't update your profile picture. Please try again.";

    throw error;
  }
};
