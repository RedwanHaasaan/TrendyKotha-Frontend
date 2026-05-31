"use client";

import { createContext, useEffect, useState } from "react";

import { getCurrentUser, loginUser, logoutUser } from "@/services/authServices";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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

  //login user
  const login = async (credentials) => {
    setLoading(true);
    try {
      const result = await loginUser(credentials);
      if (result.success) {
        setUser(result.user);
        toast.success(`Login successful! Welcome back ${result.user?.username || ''}.`);
        router.push("/dashboard");
      }
      return result;
    } catch (error) {
      setUser(null);
      toast.error(error || "Failed to login");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  //logout user
  const logout = async () => {
    setLoading(true);
    try {
      const data = await logoutUser();

      router.replace("/");

      setTimeout(() => {
        setUser(null);
        setLoading(false);
      }, 100);

      toast.success(data.message || "Logged out successfully");
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Logout failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        loadUser,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

