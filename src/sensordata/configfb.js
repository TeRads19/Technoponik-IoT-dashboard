// import App from "App";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "@firebase/firestore" untuk database firestore
import { getDatabase } from "firebase/database"; // untuk realtime database

const firebaseConfig = {
  apiKey: "AIzaSyDSZzmidtYM5UIH45aMS5Dgc7N0Utc0kr0",
  authDomain: "aquaponic-syst.firebaseapp.com",
  databaseURL: "https://aquaponic-syst-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "aquaponic-syst",
  storageBucket: "aquaponic-syst.appspot.com",
  messagingSenderId: "517246967663",
  appId: "1:517246967663:web:3d5aba0d78a948e778d29a",
  measurementId: "G-KZ7PHL1QP0",
};
export default firebaseConfig;

const masuk = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);
// kita menggunakan realtime db firebase


export const db = getDatabase(masuk);


