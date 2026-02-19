"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/auth";
import { mockAdminUser } from "@/lib/mockUser";

export type ActiveMode =
  | "ADMINISTRATOR"
  | "CARETAKER"
  | "OWNER"
  | "RESIDENT";

export interface ActiveContext {
  buildingId: string;
  mode: ActiveMode;
}

interface AuthContextType {
  user: User | null;
  activeContext: ActiveContext | null;
  loginAsAdmin: () => void;
  loginAsResident: () => void;
  logout: () => void;
  changeActiveContext: (context: ActiveContext) => void;
  isAuthLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [activeContext, setActiveContext] =
    useState<ActiveContext | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);


  useEffect(() => {
    async function initAuth() {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthLoading(false);
        return;
      }

      const response = await fetch("http://localhost:3002/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        logout();
        setIsAuthLoading(false);
        return;
      }

      const user = await response.json();
      setUser(user);

      // 👇 ahora sí podemos cargar contexto
      const storedContext = localStorage.getItem("activeContext");
      if (storedContext) {
        setActiveContext(JSON.parse(storedContext));
      }

      setIsAuthLoading(false);
    }

    initAuth();
  }, []);


  const changeActiveContext = (context: ActiveContext) => {
    setActiveContext(context);
    localStorage.setItem("activeContext", JSON.stringify(context));
  };

  async function loadUserFromToken(token: string) {
    const response = await fetch("http://localhost:3002/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      logout();
      return;
    }

    const user = await response.json();
    setUser(user);
  }


  const loginAsAdmin = async () => {
    const response = await fetch("http://localhost:3002/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "admin" })
    });

    const { token } = await response.json();

    localStorage.setItem("token", token);

    await loadUserFromToken(token);
  };


  const loginAsResident = async () => {
    const response = await fetch("http://localhost:3002/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "resident" })
    });

    const { token } = await response.json();

    localStorage.setItem("token", token);

    await loadUserFromToken(token);
  };

  const logout = () => {
    setUser(null);
    setActiveContext(null);
    localStorage.removeItem("token");
    localStorage.removeItem("activeContext");
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        activeContext,
        loginAsAdmin,
        loginAsResident,
        logout,
        changeActiveContext,
        isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
