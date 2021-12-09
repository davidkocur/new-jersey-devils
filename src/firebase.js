import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

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
let db;
let matchesCollection,
  playersCollection,
  positionsCollection,
  promotionsCollection,
  teamsCollection;

export function initializeFirebase() {
  firebaseApp = initializeApp(firebaseConfig);
  db = getFirestore();

  matchesCollection = collection(db, "matches");
  playersCollection = collection(db, "players");
  positionsCollection = collection(db, "positions");
  promotionsCollection = collection(db, "promotions");
  teamsCollection = collection(db, "teams");

  /* WARNING: Commented out code below will start writing entries into the Database at Firebase
   *     PROCEED WITH CAUTION !
   */
  // cityDb.teams.forEach((item) => {
  //   addDoc(teamsCollection, item)
  //     .then((val) => {
  //       console.log("Doc written with ID: ", val.id);
  //     })
  //     .catch((err) => {
  //       console.error("Error adding a document: ", err);
  //     });
  // });
}

export {
  firebaseApp,
  matchesCollection,
  playersCollection,
  positionsCollection,
  promotionsCollection,
  teamsCollection,
};
