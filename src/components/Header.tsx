import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { FiHome } from "react-icons/fi";
import "./Header.css";
import Cart from "./Cart";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout, cart, removeFromCart } = useAuthContext();

  return (
    <header className="header">
      <div className="header__content">
        {/* Logo / Título */}
        <h1 className="header__title">Biblioteca Online</h1>

        {/* Navegación izquierda */}
        <nav className="header__nav header__nav--left">
          <Link to="/" className="header__link">
            <FiHome className="header__icon" />
            <span>Inicio</span>
          </Link>

          {user && (
            <Link to="/mis-books" className="header__link">
              Alquilados
            </Link>
          )}
        </nav>

        {/* Bienvenida */}
        {user && <div className="header__welcome">Bienvenido: <strong>{user}</strong></div>}

        {/* Carrito */}
        <Cart items={cart} onRemoveItem={removeFromCart} onCheckout={() => navigate("/rent")} />

        {/* Navegación derecha */}
        <nav className="header__nav header__nav--right">
          {!user ? (
            <>
              <Link to="/login" className="header__link">Iniciar sesión</Link>
              <Link to="/registro" className="header__link">Registrarse</Link>
            </>
          ) : (
            <button className="header__button" onClick={logout}>
              Cerrar sesión
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
