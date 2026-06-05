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
  const [authLoading, setAuthLoading] = useState(false);

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
    setAuthLoading(true);
    try {
      const result = await loginUser(credentials);
      if (result.success) {
        setUser(result.user);
        if(result.user?.isProfileCompleted){
          router.replace("/dashboard");
          toast.success(`Login successful! Welcome back ${result.user?.username || ''}.`);
        } else {
          router.replace("/dashboard/create-profile");
          toast.success(`Login successful! Welcome ${result.user?.username || ''}. Please complete your profile.`);
        }
      }
      return result;
    } catch (error) {
      setUser(null);
      toast.error(error || "Failed to login");
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  //logout user
const logout = async () => {
  setAuthLoading(true);

  try {
    const data = await logoutUser();

    setUser(null);

    toast.success(
      data.message || "Logged out successfully"
    );

    router.replace("/");
  } catch (error) {
    toast.error(
      error.message || "Logout failed"
    );
  } finally {
    setAuthLoading(false);
  }
};
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authLoading,
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

