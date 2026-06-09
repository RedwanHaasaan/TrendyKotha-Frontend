"use client";

import { createContext, useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "@/services/authServices";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  //load User
  const loadUser = async () => {
    setLoading(true);
    try {
      const currentUser = await getCurrentUser();

      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      await loadUser();
    };

    initializeAuth();
  }, []);

  //logout user
const logout = async () => {
  setIsLoggingOut(true);
  try {
    const data = await logoutUser();

    try {
      await router.replace("/");
    } catch (e) {
      // ignore if router.replace isn't awaitable
    }

    setUser(null);

    toast.success(data.message || "Logged out successfully");
  } catch (error) {
    toast.error(error.message || "Logout failed");
  } finally {
    setIsLoggingOut(false);
  }
};
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loadUser,
        logout,
        isLoggingOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

