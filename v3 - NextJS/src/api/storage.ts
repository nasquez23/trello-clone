import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { FirebaseError } from "firebase/app";
import { auth, storage } from "@/lib/firebase";

export const uploadFileToStorage = async (file: File): Promise<string> => {
  const storageRef = ref(
    storage,
    `profile_pictures/${auth.currentUser?.uid}/${file.name}`
  );

  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.then(
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        console.error("Upload failed:", error);
        reject(error);
      }
    );
  });
};

export const deleteOldProfilePicture = async (oldPhotoURL: string) => {
  try {
    const oldPhotoRef = ref(storage, oldPhotoURL);
    await deleteObject(oldPhotoRef);
  } catch (e) {
    const error = e as FirebaseError;
    error.message = "Couldn't delete old profile picture. Please try again.";

    throw error;
  }
};
