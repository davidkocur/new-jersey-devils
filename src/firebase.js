import { initializeApp } from "firebase/app";

// import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyApA0lAxx3Y8KzO1trV-wKXlUmqTgX3v9c",
  authDomain: "new-jersey-devils.firebaseapp.com",
  projectId: "new-jersey-devils",
  storageBucket: "new-jersey-devils.appspot.com",
  messagingSenderId: "141625195432",
  appId: "1:141625195432:web:eec7f6d21d738744b47b9d",
  measurementId: "G-KPHPC3V8EK",
};

let firebaseApp;

export function initializeFirebase() {
  firebaseApp = initializeApp(firebaseConfig);
}
export { firebaseApp };
