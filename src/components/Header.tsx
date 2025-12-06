import { Link,  useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { FiHome, FiSearch } from "react-icons/fi";
import "./Header.css";
import Cart, { CartItem } from "./Cart";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout,cart, addToCart, removeFromCart } = useAuthContext();




  return (
    <header className="header">
      <div className="header__content">

        <h1 className="header__title">Biblioteca Online</h1>

        {/* BUSCADOR */}
        <div className="header__search">
          <FiSearch className="header__search-icon" />
          <input
            type="text"
            className="header__search-input"
            placeholder="Buscar libros…"
          />
        </div>

         <nav className="header__nav">
           
             <Link to="/" className="header__link">
              <FiHome className="header__icon" ></FiHome>
             <span>Inicio</span>
            </Link>
        </nav>




 <nav className="header__nav">
          {!user ? (
        ""
          ) : (
           <div className="app-header__welcome">
          Bienvenido: <strong>{user}</strong>
        </div>
          )}
        </nav>

       <Cart items={cart} onRemoveItem={removeFromCart}  onCheckout={() => navigate("/rent")}/>
     
       <nav className="header__nav">
          {user ? (
            <Link to="/mis-books" className="header__link">
              Alquilados
            </Link>
          ) : (
           ""
          )}
        </nav>

        <nav className="header__nav">
          {!user ? (
            <Link to="/login" className="header__link">
              Iniciar sesión
            </Link>
          ) : (
            <button className="header__button" onClick={logout}>
              Cerrar sesión
            </button>
          )}
        </nav>
          <nav className="header__nav">
          {!user ? (
            <Link to="/registro" className="header__link">
              Registrarse
            </Link>
          ) : (
           ""
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
