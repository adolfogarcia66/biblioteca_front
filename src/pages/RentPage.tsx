import { useState } from "react";
import { useAuthContext } from "../context/AuthContext"; // donde tengas tu contexto
import { useRentBook } from "../hooks/useRentBook";
import "./RentPage.css";

const RentPage = () => {
  const { cart, user, clearCart } = useAuthContext();
  const { rentBook, loading, error, success } = useRentBook();
  const [processing, setProcessing] = useState(false);

  const handleRent = async () => {
    if (!user) {
      alert("Debes iniciar sesión para rentar.");
      return;
    }

    setProcessing(true);

    for (const item of cart) {
      await rentBook(item.id, user);
    }

    setProcessing(false);

    if (success) {
      clearCart();
    }
  };

  return (
    <div className="rent-page">
      <h1>Renta de libros</h1>

      {cart.length === 0 ? (
        <p>No tienes libros en el carrito.</p>
      ) : (
        <div className="rent-list">
          {cart.map((book) => (
            <div key={book.id} className="rent-item">
              <div>
                <h3>{book.name}</h3>
                <p>Cantidad: {book.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        className="rent-button"
        onClick={handleRent}
        disabled={loading || processing || cart.length === 0}
      >
        {processing || loading ? "Procesando..." : "Confirmar renta"}
      </button>

      {error && <p className="rent-error">{error}</p>}
      {success && <p className="rent-success">Renta realizada con éxito 🎉</p>}
    </div>
  );
};

export default RentPage;
