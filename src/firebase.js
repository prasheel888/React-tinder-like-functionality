import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBLxGikFxa7U74Jln_jv5K5lLg0syzHLwo",
  authDomain: "matchmax-c7910.firebaseapp.com",
  projectId: "matchmax-c7910",
  storageBucket: "matchmax-c7910.appspot.com",
  messagingSenderId: "830824505412",
  appId: "1:830824505412:web:9f3cbcfc540368fddc5c11",
  measurementId: "G-FZ6X4C52KR",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export default firebase;

export { auth };
