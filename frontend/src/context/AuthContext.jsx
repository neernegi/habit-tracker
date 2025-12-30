import React, { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { authService } from "../services/auth";

const AuthContext = createContext({});

const useAuth = () => useContext(AuthContext);

export { useAuth };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      if (response.success) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
        toast.success("Login successful!");
        return { success: true };
      }
      return {
        success: false,
        message,
      };
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return { success: false, error: error.message };
    }
  };

  const signup = async (email, password) => {
    try {
      const response = await authService.signup(email, password);

      if (response.success) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
        toast.success("Account created successfully!");
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed";

      toast.error(message);

      return {
        success: false,
        message,
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
