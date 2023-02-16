import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
export const firebaseConfig = {
  apiKey: "AIzaSyALMqZAG687S5ME2pDK3Ddf71CDBHFdJ-g",
  authDomain: "keetleflix.firebaseapp.com",
  projectId: "keetleflix",
  storageBucket: "keetleflix.appspot.com",
  messagingSenderId: "700544329895",
  appId: "1:700544329895:web:a7e85eb93169893c769382",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
