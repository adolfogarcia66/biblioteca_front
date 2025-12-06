// src/context/AuthContext.tsx
import { createContext, useState, ReactNode, useContext } from "react";
import { CartItem } from "../components/Cart";

interface AuthContextType {
  user: string | null;
  token: string | null;
  login: (user: string, token: string) => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  likedBooks:string[];
  toggleLike: (id: string)=>void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [likedBooks, setLikedBooks] = useState<string[]>([]);
  const login = (username: string, token: string) => {
    setUser(username);
    setToken(token);
  };

  

  const logout = () => {
    setUser(null);
    setToken(null);
    setCart([]);

  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };
   const clearCart = () => setCart([]);

   const toggleLike = (id: string) => {
  setLikedBooks((prev) =>
    prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
  );
};


  return (
    <AuthContext.Provider value={{   user,
        token,
        login,
        logout,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        likedBooks,
        toggleLike }}>
      {children}
    </AuthContext.Provider>
  );
};

// ESTE es el hook correcto
export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  return ctx;
};
