import { useEffect, useState } from "react";
import { auth, createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup, signInWithGoogleRedirect } from "../../utils/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button from "../button/button.component";
import { getRedirectResult, UserCredential } from "firebase/auth";

interface IDefaultFormFields {
    email: string;
    password: string;
}
const defaultformFields: IDefaultFormFields = {
    email: '',
    password: '',
}
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultformFields)
    const { email, password } = formFields;

    const GooglePopup = async () => {
        const response = await signInWithGooglePopup();
        const { user } = response
        const userDocRef = await createUserDocumentFromAuth(user);
    }


    const redirectFLow = async () => {
        const response: UserCredential | null = await getRedirectResult(auth);
        if (response) {
            const { user } = response
            // const userDocRef = await createUserDocumentFromAuth(user);
        }

        console.log(response)
    }
    useEffect(() => {
        redirectFLow()
    }, [])


    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value }) // here setting state dynamically with key and values , keeping track of multiple fields / alternative to formik 
    }

    const resetFormFields =() =>{
        setFormFields(defaultformFields);
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response)
            resetFormFields()

        } catch (error) {
            switch(error.code){
                case 'auth/invalid-credential':
                    alert('incorrect pasword for email')
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }


    }


    return (<>
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>
                Sign in with your Email And Password
            </span>
            <form onSubmit={handleSubmit}>
                <FormInput label={'Email'} required type="email" name="email" onChange={handleChange} value={email} />
                <FormInput label={'Password'} required type="password" name="password" onChange={handleChange} value={password} />
                <div className="buttons-container">
                    <Button type="submit" >Sign In</Button>
                    <div className="google-buttons-container">
                        <Button buttonType='google' type='button' onClick={() => {
                            GooglePopup();
                        }}>Google(Popup)</Button>

                        <Button buttonType='google' type="button" onClick={() => {
                            signInWithGoogleRedirect()
                        }}>Google(redirect)</Button>
                    </div>
                </div>
            </form>
        </div>
    </>)
}
export default SignInForm;