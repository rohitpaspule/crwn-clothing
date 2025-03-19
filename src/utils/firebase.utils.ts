import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  User,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDR_Keo89g0gHRDdxPISz8yInibrBmJaYI",
  authDomain: "crwn-clothing-db-fab8a.firebaseapp.com",
  projectId: "crwn-clothing-db-fab8a",
  storageBucket: "crwn-clothing-db-fab8a.appspot.com",
  messagingSenderId: "429611251829",
  appId: "1:429611251829:web:a1a8c680520d184311603c",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider(); // there are mmultiple provider available like facebook, these are instantiated as classes

googleProvider.setCustomParameters({
  prompt: "select_account"
})
export const auth = getAuth(); // unlike provider auth is singleton / single instance track all auth actions

//providers of Google
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)//this method is common for all kind of providers
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);//this method is common for all kind of providers

//instance of firebase store
export const db = getFirestore();


export const createUserDocumentFromAuth = async (userAuth: User, additionalInformation = {}) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef)

  const userSnapShot = await getDoc(userDocRef)
  console.log(userSnapShot)
  console.log(userSnapShot.exists())

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName, email, createdAt, ...additionalInformation
      });
    } catch (error) {
      console.log('error creating the user', error);
    }
  }

  return userDocRef
}

// email password auth providor of firebase
export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
}

//interface layer helper function for sign in auth user email&password
export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password)
}

//iterface layer functuion to sign out user
export const signOutUser = async () => signOut(auth);