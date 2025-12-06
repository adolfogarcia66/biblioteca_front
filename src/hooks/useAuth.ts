// src/hooks/useAuth.ts

import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import api from "../api/axios";
export const useAuth = () => {
  const { login, logout, user, token } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState<string>(""); // estado para error

  const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });

    const data = response.data;

    sessionStorage.setItem("token", data.token);

    login(email, data.token);
  } catch (err) {
    setErrorMessage("Credenciales inválidas");
  }
};

  const registerUser = async (name: string, email: string, password: string, type = "USER") => {
    try {
      const res = await api.post("/auth/register", { name, email, password, type });
      //setUser(res.data);
      console.log("Usuario registrado:", res.data);
    } catch (err: any) {
      console.error("Error registrando usuario:", err.response?.data?.message || err.message);
      throw err;
    }
  };

  return { loginUser, logout, registerUser,user, token,errorMessage };
};
