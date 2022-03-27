// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDA_4I6NwIzgAoHPLhcUaIfhLX858bun9o",
  authDomain: "clomerce-1f685.firebaseapp.com",
  projectId: "clomerce-1f685",
  storageBucket: "clomerce-1f685.appspot.com",
  messagingSenderId: "713664242327",
  appId: "1:713664242327:web:930937ef94bcf665f77fd2",
  measurementId: "G-VWJ7RXYJG8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
export default fireDB;
