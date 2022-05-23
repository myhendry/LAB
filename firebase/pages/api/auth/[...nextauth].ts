import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
  limit,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  runTransaction,
} from "firebase/firestore";
// https://youtu.be/faMZxhMfMBM

!getApps().length
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

const db = getFirestore();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  adapter: FirebaseAdapter({
    db,
    collection,
    query,
    getDocs,
    where,
    limit,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    runTransaction,
  }),
});
