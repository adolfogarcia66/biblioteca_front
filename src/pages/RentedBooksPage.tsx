import { useEffect, useState } from "react";
import "./RentedBookPage.css";
import { useRentBook } from "../hooks/useRentBook";
import { useAuthContext } from "../context/AuthContext";
import ErrorMessage from "../components/ErrorMessage";
const RentedBooksPage = () => {
  const { user } = useAuthContext();
  const { rentals,rentalsreturn,rentalsextend, loading, error } = useRentBook();
  const [rentedBooks, setRentedBooks] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [selectedRentalId, setSelectedRentalId] = useState<string | null>(null);
  const [extendDays, setExtendDays] = useState<number>(1);

   const loadRentals = async () => {
    if (!user) return;
    const data = await rentals(user);
    setRentedBooks(data);
  };

 const handleReturn = async (rentalId: string) => {
  try {
    const data = await rentalsreturn(rentalId);

    setMessage("Libro devuelto correctamente.");
    setShowMessage(true);

    await loadRentals();
  } catch (err) {
    setMessage("Ocurrió un error al devolver el libro.");
    setShowMessage(true);
  }
};

const openExtendModal = (rentalId: string) => {
  setSelectedRentalId(rentalId);
  setExtendDays(1); // valor por defecto
  setShowExtendModal(true);
};

 const handleExtendConfirm = async () => {
  if (!selectedRentalId) return;

  try {
    await rentalsextend(selectedRentalId, extendDays);

    setMessage("Plazo extendido correctamente.");
    setShowMessage(true);

    setShowExtendModal(false);
    await loadRentals();
  } catch (err) {
    setMessage("Error al extender el plazo.");
    setShowMessage(true);
  }
};




  useEffect(() => {
    if (!user) return;

    loadRentals();
  }, [user]);



  return (
    <div className="rented-books">
      <h1 className="rented-books__title">Mis libros rentados</h1>

      {loading && <p className="rented-books__loading">Cargando libros...</p>}
      {error && <p className="rented-books__error">{error}</p>}

      {!loading && rentedBooks.length === 0 && (
        <p className="rented-books__empty">No tienes libros rentados.</p>
      )}

      {rentedBooks.length > 0 && (
        <table className="rented-books__table">
          <thead>
            <tr>
              <th className="rented-books__th">Portada</th>
              <th className="rented-books__th">Título</th>
              <th className="rented-books__th">Autor</th>
              <th className="rented-books__th">Fecha Inicio</th>
              <th className="rented-books__th">Fecha Límite</th>
              <th className="rented-books__th">Estado</th>
              <th className="rented-books__th">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {rentedBooks.map((r: any) => (
              <tr key={r.id} className="rented-books__row">
                <td className="rented-books__td rented-books__td--image">
                  <img
                    src={r.book.coverImageUrl}
                    alt={r.book.title}
                    className="rented-books__cover"
                  />
                </td>

                <td className="rented-books__td">{r.book.title}</td>
                <td className="rented-books__td">{r.book.author}</td>
                <td className="rented-books__td">{r.startDate}</td>
                <td className="rented-books__td">{r.dueDate}</td>
                <td className="rented-books__td">{r.status}</td>
                <td className="rented-books__td">
                  <button className="rented-books__btn rented-books__btn--extend" onClick={() => openExtendModal(r.id)}>
                    Extender
                  </button>
                  <button className="rented-books__btn rented-books__btn--return" onClick={()=>handleReturn(r.id)}>
                    Devolver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
         
      )}
       {showMessage && <ErrorMessage error={message} />}

         {showExtendModal && (
  <div className="modal-overlay">
    <div className="modal">
      <h3>Extender préstamo</h3>

      <label>Días a extender:</label>
      <input
        type="number"
        min="1"
        max="30"
        value={extendDays}
        onChange={(e) => setExtendDays(parseInt(e.target.value))}
      />

      <div className="modal__actions">
        <button className="confirm-btn" onClick={handleExtendConfirm}>
          Confirmar
        </button>
        <button className="cancel-btn" onClick={() => setShowExtendModal(false)}>
          Cancelar
        </button>
      </div>
    </div>
  </div>
)}
    </div>

    
  );



};

export default RentedBooksPage;
