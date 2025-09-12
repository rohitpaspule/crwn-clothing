import { createContext, useEffect, useState } from "react";
import { createUserDocumentFromAuth, onAuthStateChangeListener , signOutUser } from "../utils/firebase.utils";
//as the actual value to be accessed
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: (user) => null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };
    useEffect(()=>{
    const unsubscribe = onAuthStateChangeListener((user)=>{ 
        if(user){
            createUserDocumentFromAuth(user)
            // if user not null create doc , create doc handle and check if user already exist before creating
        }
        setCurrentUser(user)
    })
    return unsubscribe

    },[])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

