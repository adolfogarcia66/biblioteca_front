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
let allSuccess = true;
    setProcessing(true);

    for (const item of cart) {
      const result = await rentBook(item.id, user);
       if (!result) {
      allSuccess = false;
      console.error(`No se pudo rentar el libro: ${item.name}`);
    }
    }

    setProcessing(false);

    if (allSuccess) {
    clearCart(); // limpia el carrito solo si todos los libros se rentaron
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
