/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import { toast } from "sonner";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("adminToken");
  if (storedToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
  }

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("adminUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const loading = false;
  const logout = () => {
    setUser(null);
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
    delete axios.defaults.headers.common["Authorization"];
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    // Response interceptor to handle errors globally
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
          window.location.href = "/login";
        } else {
          const message =
            error.response?.data?.message ||
            error.message ||
            "An error occurred";
          toast.error(message);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${config.API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { user, token } = response.data;

      if (user.role !== "admin") {
        throw new Error("Access denied. Admin only.");
      }

      setUser(user);
      localStorage.setItem("adminUser", JSON.stringify(user));
      localStorage.setItem("adminToken", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || error.message || "Login failed",
      };
    }
  };

  // const logout = () => {
  //   setUser(null);
  //   localStorage.removeItem("adminUser");
  //   localStorage.removeItem("adminToken");
  //   delete axios.defaults.headers.common["Authorization"];
  // };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
