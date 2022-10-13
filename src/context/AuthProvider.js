import React, { createContext, useContext, useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

import { auth } from "../firebase-config"

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState();

  async function signupUser(email, password) {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    })

    return unsubscribe;
  }, [])

  const value = {currentUser, signupUser}
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}