import { signInWithGooglePopup , createUserDocumentFromAuth} from "../../utils/firebase.utils";

const SignIn  = () =>{
    const logGoogleUser = async() =>{
       const response = await signInWithGooglePopup(); 
       const {user} =  response
       const userDocRef =  await createUserDocumentFromAuth(user);
    }
    return(<>
   <h1> Sign in Page</h1>
   <button onClick={()=>{
    logGoogleUser();
   }}>Signin</button>

    </>)
}
export default SignIn