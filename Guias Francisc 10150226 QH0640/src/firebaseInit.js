// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage';
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYEG922G3UGOV4XaGAQqel0tfXYqA2oP4",
  authDomain: "study-room-4e155.firebaseapp.com",
  projectId: "study-room-4e155",
  storageBucket: "study-room-4e155.appspot.com",
  messagingSenderId: "971719389983",
  appId: "1:971719389983:web:a43526c622e8a68f54f62a",
  measurementId: "G-F018ZWY9FE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {app, storage, auth, db};