// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5LlfUwxKVi5wo-RPWSns20PNoQiMYxBs",
  authDomain: "hostel123-daniel.firebaseapp.com",
  projectId: "hostel123-daniel",
  storageBucket: "hostel123-daniel.appspot.com",
  messagingSenderId: "264637579209",
  appId: "1:264637579209:web:7de81ed060159ea4367218"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)