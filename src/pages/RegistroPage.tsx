import { Link } from "react-router-dom";
import "./RegistroPage.css";


export default function RegistroPage() {
return (
<div className="register">
<section className="register__card">
<h1 className="register__title">Crear cuenta</h1>


<div className="register__group">
<label className="register__label" htmlFor="nombre">Nombre</label>
<input className="register__input" id="nombre" type="text" required />
</div>


<div className="register__group">
<label className="register__label" htmlFor="email">Email</label>
<input className="register__input" id="email" type="email" required />
</div>


<div className="register__group">
<label className="register__label" htmlFor="password">Password</label>
<input className="register__input" id="password" type="password" required />
</div>


<button className="register__button">Registrarse</button>


<p className="register__footer">
¿Ya tienes cuenta? <Link to="/login" className="register__link">Inicia sesión</Link>
</p>
</section>
</div>
);
}