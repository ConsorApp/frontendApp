"use client";

import { createContext, useContext, useState } from "react";
import { User } from "@/types/auth";
import { mockAdminUser } from "@/lib/mockUser";

interface AuthContextType {
  user: User | null;
  activeBuildingId: string | null;
  loginAsAdmin: () => void;
  loginAsResident: () => void;
  logout: () => void;
  setActiveBuilding: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // const [user, setUser] = useState({
  //   id: "1",
  //   name: "Juan",
  // });
  const [activeBuildingId, setActiveBuildingId] = useState<string | null>(null);

  const loginAsAdmin = async () => {
    setUser(mockAdminUser);
    setActiveBuildingId(null);
  };

  const loginAsResident = async () => {
    const { mockResidentUser } = await import("@/lib/mockUser");
    setUser(mockResidentUser);
    setActiveBuildingId(mockResidentUser.unitMemberships[0].buildingId);
  };

  const logout = () => {
    setUser(null);
    setActiveBuildingId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        activeBuildingId,
        loginAsAdmin,
        loginAsResident,
        logout,
        setActiveBuilding: setActiveBuildingId,
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
