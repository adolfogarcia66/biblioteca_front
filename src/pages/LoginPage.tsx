// LoginPage.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import "./LoginPage.css";
import ErrorMessage from "../components/ErrorMessage";

const LoginPage: React.FC = () => {
  const { loginUser,errorMessage } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginUser(username, password);
    navigate(from, { replace: true });
  };

  return (
    <div className="login">
      <section className="login__card">
        <h2 className="login__title">Iniciar sesión</h2>

        <form onSubmit={handleSubmit} className="login__form">
          <div className="login__group">
            <label className="login__label" htmlFor="user">Usuario</label>
            <input
              id="user"
              className="login__input"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="login__group">
            <label className="login__label" htmlFor="pass">Contraseña</label>
            <input
              id="pass"
              type="password"
              placeholder="Contraseña"
              className="login__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="login__button">Entrar</button>
        </form>
         <ErrorMessage error={errorMessage} duration={4000} />
      </section>
    </div>
  );
};

export default LoginPage;
