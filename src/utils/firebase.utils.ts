import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  UserCredential,
  User,
} from "firebase/auth";

import { getFirestore, doc , getDoc , setDoc } from 'firebase/firestore'

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

const provider =  new GoogleAuthProvider();
provider.setCustomParameters({
    prompt : "select_account"
})
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider)

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth : User) =>{
 const userDocRef = doc(db , 'users', userAuth.uid);
 console.log(userDocRef)
 const userSnapShot = await getDoc(userDocRef)
 console.log(userSnapShot)
 console.log(userSnapShot.exists())
 if(!userSnapShot.exists()){
  const {displayName , email } = userAuth;
  const createdAt = new Date();
  try {
    await setDoc(userDocRef,{
      displayName,email,createdAt
    });
  }catch(error){
    console.log('error creating the user', error);
 }
 }
 return userDocRef
}