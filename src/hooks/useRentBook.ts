
import { useState } from "react";
import api from "../api/axios";

export const useRentBook = () => {
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const rentBook = async (bookId: string, userId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post(`/rentals`, null, {
        params: { bookId, userId },
      });
     
      setSuccess(true);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Error inesperado");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

    const rentals = async ( userId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post(`/rentals/user/${userId}`);
      setSuccess(true);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Error inesperado");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const rentalsreturn = async ( id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post(`/rentals/${id}/return`);
      setSuccess(true);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Error inesperado");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const rentalsextend = async ( id: string , days:number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post(`/rentals/${id}/extend`,null,{params:{days},});
      setSuccess(true);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Error inesperado");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { rentBook,rentals,rentalsreturn,rentalsextend ,loading, error, success };
};
