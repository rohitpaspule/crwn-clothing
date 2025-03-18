import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'
import Button from "../button/button.component";

interface IDefaultFormFields {
    displayName: string;
    email: string;
    password: string;
    confirmPassword: string;
}
const defaultformFields: IDefaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultformFields)
    const { displayName, email, password, confirmPassword } = formFields;
    console.log(formFields)
    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value }) // here setting state dynamically with key and values , keeping track of multiple fields / alternative to formik 
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const response: any = await createAuthUserWithEmailAndPassword(email, password);
            const { user } = response
            await createUserDocumentFromAuth(user, { displayName })

            console.log(response)

        } catch (error) {
            console.log("USer createtion encountered error", error)
        }


    }


    return (<>
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>
                Sign up With your Email And Password
            </span>
            <form onSubmit={handleSubmit}>
                <FormInput label={'Display Name'} required type="text" name="displayName" onChange={handleChange} value={displayName} />
                <FormInput label={'Email'} required type="email" name="email" onChange={handleChange} value={email} />
                <FormInput label={'Password'} required type="password" name="password" onChange={handleChange} value={password} />
                <FormInput label={'Confirm Password'} required type="password" name="confirmPassword" onChange={handleChange} value={confirmPassword} />
                <Button type="submit" >Sign Up</Button>
            </form>
        </div>
    </>)
}
export default SignUpForm;