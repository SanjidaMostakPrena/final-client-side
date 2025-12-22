
import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseinit";
import { AuthContext } from "./AuthContext";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    setLoading(true);
    await signOut(auth);
    setUser(null);
    setRole(null);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setRole(null);
        localStorage.removeItem("access-token"); // optional safe
        setLoading(false);
        return;
      }

      try {
        // ✅ ONLY FETCH USER (NO SAVE HERE)
        const res = await fetch(
          `https://courierapp-three.vercel.app/users/${currentUser.email}`
        );

        if (!res.ok) throw new Error("User not found");

        const data = await res.json();
        setUser(data);
        setRole(data.role || "user");

        // 🔐 ===== JWT TOKEN HERE (AI CODER BOSBE ETAI) =====
        const jwtRes = await fetch("https://courierapp-three.vercel.app/jwt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: currentUser.email }),
        });

        const jwtData = await jwtRes.json();
        if (jwtData.token) {
          localStorage.setItem("access-token", jwtData.token);
        }
        // 🔐 ===== JWT END =====

      } catch (err) {
        console.error("MongoDB fetch error:", err);

        // fallback (firebase user only)
        setUser({
          name: currentUser.displayName || "N/A",
          email: currentUser.email,
          uid: currentUser.uid,
          role: "user",
        });
        setRole("user");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);


  const authInfo = {
    user,
    role,
    loading,
    registerUser,
    loginUser,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
