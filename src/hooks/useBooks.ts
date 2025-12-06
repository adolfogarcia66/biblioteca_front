import { useEffect, useState } from "react";

import { Book } from "../types";
import api from "../api/axios";

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBooks = async (query: string = "") => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/books/carousel", {
        params: query ? { search: query } : {},
      });
      setBooks(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error obteniendo libros");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return { books, loading, error,fetchBooks };
};
