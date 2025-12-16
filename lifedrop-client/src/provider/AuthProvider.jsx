import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password, name, photoURL) => {
    setLoading(true);

    return createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(user);
        return updateProfile(res.user, { displayName: name, photoURL }).then(
          () => {
            setUser({ ...res.user });
            return res;
          }
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    );
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        createUser,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
