import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase-config";
import { CircularProgress } from "@mui/material";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const currentUsername = currentUser && currentUser.email.split("@")[0];
  const [loadingCurrentUser, setLoadingCurrentUser] = useState(true);

  async function signupUser(email, password) {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  async function loginUser(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoadingCurrentUser(false);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, currentUsername, signupUser, loginUser };

  return (
    <AuthContext.Provider value={value}>
      {loadingCurrentUser ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
};
