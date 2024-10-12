import { auth } from "./firebase";

export const registerUser = async (email, password) => {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );

    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error.message);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error signing out:", error.message);
    throw error;
  }
};
