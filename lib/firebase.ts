import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDR0ldNdq8zfgwO5VAB3TI6JMFeCWREb68",
  authDomain: "students-table-f08d4.firebaseapp.com",
  projectId: "students-table-f08d4",
  storageBucket: "students-table-f08d4.firebasestorage.app",
  messagingSenderId: "554520769364",
  appId: "1:554520769364:web:6d96d1ec335f1d6a6c4ec1",
  measurementId: "G-H5Z2KP99GX",
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)