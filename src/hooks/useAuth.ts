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
  

  return { loginUser, logout, user, token,errorMessage };
};
