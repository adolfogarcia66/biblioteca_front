import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./RegistroPage.css";
import { useAuth } from "../hooks/useAuth";
import ErrorMessage from "../components/ErrorMessage";

export default function RegistroPage() {
  const { registerUser ,loginUser } = useAuth();
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(name, email, password);
    setError("Usuario registrado !");
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2500);
     // 2️⃣ Hacer login automático
    await loginUser(email, password);
     navigate("/"); // redirige al home después de registrarse
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrarse");
    }
  };

  return (
    <div className="register">
      <section className="register__card">
        <h1 className="register__title">Crear cuenta</h1>

        {error && <p className="register__error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="register__group">
            <label className="register__label" htmlFor="nombre">Nombre</label>
            <input
              className="register__input"
              id="nombre"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="register__group">
            <label className="register__label" htmlFor="email">Email</label>
            <input
              className="register__input"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="register__group">
            <label className="register__label" htmlFor="password">Password</label>
            <input
              className="register__input"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="register__button" type="submit">Registrarse</button>
        </form>

        <p className="register__footer">
          ¿Ya tienes cuenta? <Link to="/login" className="register__link">Inicia sesión</Link>
        </p>
      </section>
       {showMessage && <ErrorMessage error={error} />}
    </div>
  );
}

