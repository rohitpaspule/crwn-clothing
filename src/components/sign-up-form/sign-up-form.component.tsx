import { useState } from "react";

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
        setFormFields({...formFields, [name] : value })
    }
    return(<>
    <h1>
        SignUp With Email And Password
    </h1>
    <form>
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
    </>)
}
export default SignUpForm;