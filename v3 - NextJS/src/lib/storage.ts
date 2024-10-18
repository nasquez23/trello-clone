import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, storage } from "./firebase";

export const uploadFileToStorage = async (file: File): Promise<string> => {
  const storageRef = ref(
    storage,
    `profile_pictures/${auth.currentUser?.uid}/${file.name}`
  );

  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload failed:", error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
      }
    );
  });
};
