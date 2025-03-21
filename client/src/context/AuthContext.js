import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = (
  process.env.REACT_APP_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.timeout = 10000; // 10 second timeout

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await api.get("/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      }
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post("/api/login", {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      await checkAuth();
      return true;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error.response?.data?.error || "Login failed");
    }
  };

  const register = async (
    email,
    password,
    securityQuestion,
    securityAnswer
  ) => {
    try {
      console.log("Registering with:", { email, securityQuestion });
      const response = await api.post("/api/register", {
        email,
        password,
        securityQuestion,
        securityAnswer,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      await checkAuth();
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error(error.response?.data?.error || "Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    return true;
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
