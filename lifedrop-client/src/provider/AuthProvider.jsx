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
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const [userStatus, setUserStatus] = useState("");

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
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          const res = await axios.get(
            `https://lifedrop-backend.vercel.app//users/role/${currentUser.email}`
          );
          setRole(res.data.role);

          console.log(role);

          setUserStatus(res.data.status);
        } catch (err) {
          console.error("Role fetch error", err);
          setRole(null);
        }
      } else {
        setRole(null);
      }

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
        role,
        userStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
