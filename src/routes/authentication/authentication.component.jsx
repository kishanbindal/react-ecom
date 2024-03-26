import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth'

import { 
    auth,
    signInWithGooglePopup, 
    signInWithGoogleRedirect,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import './authentication.styles.scss'; 

const Authentication = () => {

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
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
        </div>
    )
}


export default Authentication