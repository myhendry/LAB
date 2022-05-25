import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

const app = !getApps().length
  ? initializeApp({
      apiKey: "AIzaSyDNvCOKseMJQRkW2jpw9EMJ_U8TlXj9VKA",
      authDomain: "jobs-903f5.firebaseapp.com",
      databaseURL: "https://jobs-903f5.firebaseio.com",
      projectId: "jobs-903f5",
      storageBucket: "jobs-903f5.appspot.com",
      messagingSenderId: "703674070669",
      appId: "1:703674070669:web:e339189289f3aa677514c4",
    })
  : getApp();

const db = getFirestore(app);
const storage = getStorage();

export { app, db, storage };
