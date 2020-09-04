import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCi-E8KU8c53QZkpuLApDhGFF-zRafqBGo",
  authDomain: "whatsapp-clone-6af34.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-6af34.firebaseio.com",
  projectId: "whatsapp-clone-6af34",
  storageBucket: "whatsapp-clone-6af34.appspot.com",
  messagingSenderId: "1045532258276",
  appId: "1:1045532258276:web:91e906e78c91aad3f221f1",
  measurementId: "G-FVH2M8CYD2",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
