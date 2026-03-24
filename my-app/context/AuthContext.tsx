"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { api } from "../app/api";

interface User {
  id: string;
  email: string;
  role: string;
}

interface Profile {
  id: string;
  nombre: string;
  fotoPerfil?: string;
  bio?: string;
  nacionalidad?: string;
  steamLink: string;
}

interface AuthResult {
  success: boolean;
  user?: User | null;
  error?: string | null;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  refreshProfile: () => Promise<void>;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => void;
  register: (email: string, password: string, nombre: string) => Promise<AuthResult>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const router = useRouter();

  // cargar desde localStorage
  useEffect(() => {

    const savedUser = localStorage.getItem("user");
    const savedProfile = localStorage.getItem("profile");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedProfile) setProfile(JSON.parse(savedProfile));

  }, []);

  // cargar perfil desde API
  const refreshProfile = async () => {

    if (!user) return;

    try {

      const payload = {
        userId: user.id
      };

      const res = await api.post("/api/profile", payload);

      const p = res.dataList[0];

      setProfile(p);
      localStorage.setItem("profile", JSON.stringify(p));

    } catch (err) {
      console.error("Error cargando perfil", err);
    }

  };

  const login = async (email: string, password: string): Promise<AuthResult> => {

    try {

      const data = await api.post("/api/auth/login", { email, password });

      if (data.success && data.user) {

        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));

        // cargar perfil inmediatamente
        const res = await api.post("/api/profile", {
          userId: data.user.id
        });

        const p = res.dataList[0];

        setProfile(p);
        localStorage.setItem("profile", JSON.stringify(p));

      }

      return {
        success: data.success,
        user: data.user ?? null,
        error: data.error ?? null,
      };

    } catch (err: any) {

      console.error("Login error", err);

      return {
        success: false,
        user: null,
        error: err.message ?? "Error desconocido"
      };

    }

  };

  const register = async (email: string, password: string, nombre: string): Promise<AuthResult> => {

    try {

      const data = await api.post("/api/auth/register", {
        email,
        password,
        nombre
      });

      if (data.success && data.user) {

        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));

        const res = await api.post("/api/profile", {
          userId: data.user.id
        });

        const p = res.dataList[0];

        setProfile(p);
        localStorage.setItem("profile", JSON.stringify(p));

      }

      return {
        success: data.success,
        user: data.user ?? null,
        error: data.error ?? null,
      };

    } catch (err: any) {

      console.error("Register error", err);

      return {
        success: false,
        user: null,
        error: err.message ?? "Error desconocido"
      };

    }

  };

  const logout = () => {

    setUser(null);
    setProfile(null);

    localStorage.removeItem("user");
    localStorage.removeItem("profile");

    router.push("/");

  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        setUser,
        setProfile,
        refreshProfile,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;

};