"use client";

import {  createContext, useContext, useState, useEffect,} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

// get use when app start and only once , load session on app start , avoid infinte API calls
  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/me");
        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        
        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const login = async (email, password) => {
    const res = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    setUser(data.user);

    return data;
  };

  const logout = async () => {
  await fetch("/api/signout", { method: "POST" });
  setUser(null);
};

  return (
    <AuthContext.Provider
      value={{
  user,
  loading,
  login,
  logout,
  isAuthenticated: !!user
}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);