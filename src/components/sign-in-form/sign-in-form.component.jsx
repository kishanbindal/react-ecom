import FormInput from "../form-input/form-input.component"
import Button, {} from '../button/button.component';
import { useState, useContext } from "react";
import { createUserDocumentFromAuth, signInUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import './sign-in-form.styles.scss';


const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async() => {
        const {user} = await signInWithGooglePopup()
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {user} = await signInUserWithEmailAndPassword(email, password)
            resetFormFields();
        } catch(error){
            switch(error.code){
                case 'auth/invalid-credential':
                    console.log(error.code)
                    alert("Invalid Credentials");
                    break
                default:
                    console.log(error)
            }
        };
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    return(
        <div className="sign-in-container">
            <h2>Already Have an account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label={"Email"}
                    required 
                    type="email" 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                />

                <FormInput
                    label={"Password"}
                    required 
                    type="password" 
                    onChange={handleChange} 
                    name="password" 
                    value={password}
                />

                <div className="buttons-container">
                    <Button type="submit" buttonText="SIGN IN" className=""/>
                    <Button type="button" className="google" buttonText="GOOGLE SIGN IN" onClick={signInWithGoogle}/>
                </div>
            </form>

        </div>

    )
}

export default SignInForm