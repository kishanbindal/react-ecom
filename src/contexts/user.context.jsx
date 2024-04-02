import { createContext, useEffect, useReducer } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';


// As the actual Value that needs to be accessed
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

export const USER_ACTION_TYPES = {
    'SET_CURRENT_USER': 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    const { type, payload } = action;
   
    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`)
    }
}
const INITIAL_STATE = {
    currentUser: null
}
export const UserProvider = ({children}) => {
    // const [currentUser, setCurrentUser] = useState(null);
    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE); // [state, dispatch]
    
    const setCurrentUser = (user) => {
        const action = {
            type: USER_ACTION_TYPES.SET_CURRENT_USER,
            payload: user
        }
        dispatch(action);
    }

    const value = {currentUser, setCurrentUser};
    
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe;
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

/* 
const userReducer = (state, action) => {
    return {
        currentUser: {...}/null
    }
}
*/