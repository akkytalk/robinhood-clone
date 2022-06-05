import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA5NhFZZD6V08eGnrPt8OvO60Q5nT1KGvY",
  authDomain: "robinhood-clone-acc5c.firebaseapp.com",
  projectId: "robinhood-clone-acc5c",
  storageBucket: "robinhood-clone-acc5c.appspot.com",
  messagingSenderId: "956089621002",
  appId: "1:956089621002:web:1f23d7f572e6bf5fc9ddf3",
  measurementId: "G-7K6RND5468",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { db };
