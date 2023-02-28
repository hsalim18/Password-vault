// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8R6fu5KG4xqPxj--RDGezrYyH_j8nKmc",
  authDomain: "password-vault-6bf39.firebaseapp.com",
  projectId: "password-vault-6bf39",
  storageBucket: "password-vault-6bf39.appspot.com",
  messagingSenderId: "222989646726",
  appId: "1:222989646726:web:37f5f0453555adb6c74a07",
  measurementId: "G-QNXSFVSE66"

  
  
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

