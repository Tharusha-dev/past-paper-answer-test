import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBCSjNMxsauTDIyr9IP6agf458c6z2uX5Q",
  authDomain: "pastpaperhelp-test.firebaseapp.com",
  projectId: "pastpaperhelp-test",
  storageBucket: "pastpaperhelp-test.appspot.com",
  messagingSenderId: "919352215152",
  appId: "1:919352215152:web:fd46c77dab367371f796b5",
  measurementId: "G-ZMXKQF78P1"
};


export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

// export const auth = getAuth(app)


