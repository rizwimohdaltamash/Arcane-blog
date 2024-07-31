import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBhEydhaMdZgwEIlAyH2E5gK_995kabMSQ",
  authDomain: "posts-e1faf.firebaseapp.com",
  projectId: "posts-e1faf",
  storageBucket: "posts-e1faf.appspot.com",
  messagingSenderId: "165437922168",
  appId: "1:165437922168:web:e3b68bb815729bbd62468d",
};

const app = initializeApp(firebaseConfig);

const fireDb = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { fireDb, auth, storage };