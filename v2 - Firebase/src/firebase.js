// Excluded firebase config for security reasons

const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(app);