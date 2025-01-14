"use client";
import Loading from "@/components/Custom/Loading";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase/config";

const AuthContext = createContext<any>({});
export const useAuth = (): IAuthContext => useContext(AuthContext);
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState<boolean>();
  //AuthState Change Use Effect
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //Sign Up Auth function
  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  //login Auth function
  async function login(email: string, password: string) {
    const value = await signInWithEmailAndPassword(auth, email, password);
    setUser(value.user);
  }
  //Google Login and signup Auth function
  async function googleAccess() {
    const value = await signInWithPopup(auth, new GoogleAuthProvider());
    setUser(value.user);
  }

  //logout Auth function
  async function logout() {
    await signOut(auth);
    console.log("logged out");
    Cookies.remove("token");
    Cookies.set("loggedin", "false");
    Cookies.remove("uid");
    setUser(null);
  }
  //Password Reset Auth function
  function resetPass(email: string) {
    return sendPasswordResetEmail(auth, email);
  }
  //Send Email Verification Auth Function
  async function sendEV() {
    if (auth.currentUser == null) {
      return;
    }
    return sendEmailVerification(auth.currentUser);
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        googleAccess,
        sendEV,
        logout,
        resetPass,
        user,
      }}
    >
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
interface IAuthContext {
  login: (email: string, password: string) => Promise<UserCredential>;
  signup: (email: string, password: string) => Promise<UserCredential>;
  googleAccess: () => Promise<UserCredential>;
  sendEV: () => Promise<void> | null;
  logout: () => void;
  resetPass: (email: string) => Promise<void>;
  user: User | null;
}
