import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth'

import { 
    auth,
    signInWithGooglePopup, 
    signInWithGoogleRedirect,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';


const SignIn = () => {

    // useEffect(() => {
    //     const redirectResult = async () => {
    //         const response = await getRedirectResult(auth);
    //         if (response) {
    //             const {user} = response
    //             const userDocRef = await createUserDocumentFromAuth(user);
    //             console.log(userDocRef)
    //             return userDocRef;
    //         }
    //     }
    //     const userDocRef = redirectResult()
    // }, [])

    const logGoogleUser = async() => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }


    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
            {/* <button onClick={signInWithGoogleRedirect}>
                Sign in with Google Redirect
            </button> */}
            <SignUpForm />
        </div>
    )
}


export default SignIn