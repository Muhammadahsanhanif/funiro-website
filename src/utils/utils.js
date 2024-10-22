import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcDy1RnwRae8RMazEI-vn-zFrUoN7N2Vw",
  authDomain: "reactfirebase-9fd7d.firebaseapp.com",
  projectId: "reactfirebase-9fd7d",
  storageBucket: "reactfirebase-9fd7d.appspot.com",
  messagingSenderId: "226143993234",
  appId: "1:226143993234:web:bb34d87c8089a8634bd54b",
  measurementId: "G-E7C3R5V8SS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app);


export {
    auth,
    db,
    storage 
}