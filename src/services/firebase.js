import firebase from "firebase";

const firebaseapp = firebase.initializeApp({
  apiKey: "AIzaSyDd7TvdJdjQ7vvQyx11XhIGauoIjMrhdiM",
  authDomain: "todo-scrum-app.firebaseapp.com",
  projectId: "todo-scrum-app",
  storageBucket: "todo-scrum-app.appspot.com",
  messagingSenderId: "717474834297",
  appId: "1:717474834297:web:971fa33f32228c35da71a8",
  measurementId: "G-8X8T8L9JPN",
});

const db = firebaseapp.firestore();
const auth = firebase.auth();

export { db, auth };
