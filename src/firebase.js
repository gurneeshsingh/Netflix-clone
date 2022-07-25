import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "netflix-clone-gurneesh.firebaseapp.com",
    projectId: "netflix-clone-gurneesh",
    storageBucket: "netflix-clone-gurneesh.appspot.com",
    messagingSenderId: "859353219148",
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialise the firebase app with our config keys ;
const firebaseApp = initializeApp(firebaseConfig);

// set up firestore DB 
const db = getFirestore(firebaseApp)

// authentication
const auth = getAuth(firebaseApp);

//export db as default and rest as seperate
 
export default db;
export { auth };