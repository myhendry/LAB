import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import { getAuth } from "@firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyB8GkNF86EdN9yZBoZ-L12iP5qMW2AJTuY",
  authDomain: "chatty-cdef9.firebaseapp.com",
  projectId: "chatty-cdef9",
  storageBucket: "chatty-cdef9.appspot.com",
  messagingSenderId: "423032860854",
  appId: "1:423032860854:web:708e247e743df3d2da3617",
  measurementId: "G-RJLLBGKE60",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();

export { app, auth, db, storage };
