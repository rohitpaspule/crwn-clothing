import { useEffect } from "react";
import { signInWithGooglePopup , createUserDocumentFromAuth, signInWithGoogleRedirect, auth} from "../../utils/firebase.utils";
import { UserCredential, getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn  = () =>{
    const logGoogleUser = async() =>{
       const response = await signInWithGooglePopup(); 
       const {user} =  response
       const userDocRef =  await createUserDocumentFromAuth(user);
    }


const redirectFLow = async() =>{
    const response : UserCredential | null = await getRedirectResult(auth);
    if(response){
        const {user} = response
        const userDocRef =  await createUserDocumentFromAuth(user);
    }
    
    console.log(response)
}
useEffect(()=>{
    redirectFLow()
},[])
    return(<>
   <h1> Sign in Page</h1>
   <button onClick={()=>{
    logGoogleUser();
   }}>Signin with google</button>

<button type="button" onClick={()=>{
    signInWithGoogleRedirect()
   }}>Signin with redirect</button>
   <SignUpForm />

    </>)
}
export default SignIn