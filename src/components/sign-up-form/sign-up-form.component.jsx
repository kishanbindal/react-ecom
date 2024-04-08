import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;


    const resetFormFields = () => {
           setFormFields(defaultFormFields);
    }

    const validatePassword = (passString) => {
        // Password Should have minimum
        const regex = /(\w+\S*){8,}/
        if (!passString.match(regex)) return;
        return true;
    }

    const validateDisplayName = (displayNameString) => {
        const regex = /\w+/;
        if (!displayNameString.match(regex)) return;
        return true;
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        var passValidationCheck = false;
        if (validatePassword(password) && password === confirmPassword){
            passValidationCheck = true
        } else {
            alert("passwords dont match!")
            return;
        }
        var displayNameValidationCheck = validateDisplayName(displayName);

        if (passValidationCheck && displayNameValidationCheck){
            try {
                const {user} = await createAuthUserWithEmailAndPassword(email, password);
                const userDocRef = await createUserDocumentFromAuth(user, {displayName});
                resetFormFields()
            } catch (error) {
                if(error.code === 'auth/email-already-in-use'){
                    console.log("error code", error.code)
                    alert("Cannot create user, email already in use")
                } else{
                    console.log(error.code)
                    console.log("User creation encountered an error", error)
                }
            }
        } else {
            alert("Validation check failed")
        }

    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign Up With your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label={"Display Name"}
                    required 
                    type="text" 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName}
                />
                
                <FormInput 
                    label={"Email"}
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                />
                <FormInput 
                    required 
                    label={"Password"}
                    type="password"
                    onChange={handleChange} 
                    name="password" 
                    value={password}
                />
                
                <FormInput
                    required 
                    label={"Confirm Password"}
                    type="password" 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword}
                />

                <Button buttonText="SIGN UP" type="submit" className=""/>
            </form>
        </div>
    )
}

export default SignUpForm