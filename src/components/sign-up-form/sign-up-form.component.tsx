import { useState } from "react";
import { createAuthUserWithEmailAndPassword } from "../../utils/firebase.utils";

interface IDefaultFormFields {
    displayName : string;
    email : string;
    password : string;
    confirmPassword : string;
}
const defaultformFields : IDefaultFormFields = {
    displayName : '',
    email : '',
    password : '',
    confirmPassword : ''
}
const SignUpForm = () =>{
    const [formFields , setFormFields] = useState(defaultformFields)
    const {displayName , email , password , confirmPassword} = formFields;
    console.log(formFields)
    const handleChange = (event : any) =>{
        const {name , value} = event.target;
        setFormFields({...formFields, [name]:value }) // here setting state dynamically with key and values , keeping track of multiple fields / alternative to formik 
    }

    const handleSubmit= async(event : any) =>{
        event.preventDefault()
        if(password !== confirmPassword){
            alert("Passwords do not match");
             return;
        }
        try {
            const response  = await createAuthUserWithEmailAndPassword(email,password);
            console.log(response)

        }catch(error){
            console.log("USer createtion encountered error", error)
        }

        
    }
    

    return(<>
    <div>
    <h1>
        Sign up With your Email And Password
    </h1>
    <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input required type="text" name="displayName" onChange={handleChange} value={displayName}/>
        <label> Email</label>
        <input required type="email" name="email"  onChange={handleChange} value={email}/>
        <label>Password</label>
        <input required type="password" name="password"  onChange={handleChange} value={password}/>
        <label>Confirm Password</label>
        <input required  type="password" name="confirmPassword"  onChange={handleChange} value={confirmPassword}/>
        <button type="submit">Sign Up</button>
    </form>
    </div>
    </>)
}
export default SignUpForm;