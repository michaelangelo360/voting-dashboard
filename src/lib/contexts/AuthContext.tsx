"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would verify the token with your backend
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      //this would be an API call to your backend
      // For demo purposes, we'll just simulate a successful login
      
      // Simulating network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in a real app, this would come from your backend
      const mockUser: User = {
        id: "user-123",
        name: email.split("@")[0], // Using part of email as name for demo
        email,
        role: email.includes("admin") ? "admin" : "user",
      };

      // Save to local storage - in a real app, you'd store a token instead
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      router.push("/overview");
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // this would be an API call to your backend
      // For demo purposes, we'll just simulate a successful registration
      
      // Simulating network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: "user",
      };

      // Save to local storage
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      router.push("/overview");
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}