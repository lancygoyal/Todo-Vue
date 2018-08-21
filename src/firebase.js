import firebase from "firebase";
import "firebase/firestore";

// firebase init goes here
const config = {
  apiKey: "AIzaSyA_9zS8y5WTgemMWPnWcuXZQZ9NAuOzzn0",
  authDomain: "todo-49a43.firebaseapp.com",
  databaseURL: "https://todo-49a43.firebaseio.com",
  projectId: "todo-49a43",
  storageBucket: "todo-49a43.appspot.com",
  messagingSenderId: "929555416098"
};

firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
};
db.settings(settings);

// firebase collections
const tasksCollection = db.collection("tasks");

export default {
  db,
  provider,
  auth,
  tasksCollection
};
