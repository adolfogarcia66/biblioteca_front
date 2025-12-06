import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import "./HomePage.css";
import Carousel from "../components/Carousel";
import { useBooks } from "../hooks/useBooks";
import ErrorMessage from "../components/ErrorMessage";
import BookCarousel from "../components/BookCarousel";
import { useEffect, useState } from "react";
import { CartItem } from "../components/Cart";
import { FiSearch } from "react-icons/fi";

const HomePage = () => {
  const { user, cart, likedBooks, addToCart, removeFromCart, toggleLike } =
    useAuthContext();
  const { books, loading, error,fetchBooks  } = useBooks();

  const [showFavoriteMessage, setShowFavoriteMessage] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleToggleLike = (id: string) => {
    const alreadyLiked = likedBooks.includes(id);

    toggleLike(id);

    setMessage(
      alreadyLiked ? "Se quitó de favoritos" : "Se añadió a favoritos"
    );
    setShowFavoriteMessage(true);

    setTimeout(() => setShowFavoriteMessage(false), 2500);
  };

  const handleAddToCart = (item: CartItem) => {
    const exists = cart.some((i) => i.id === item.id);

    addToCart(item);

    if (exists) {
      setMessage("Cantidad actualizada");
    } else {
      setMessage("Se añadió al carrito");
    }
    setShowFavoriteMessage(true);
    setTimeout(() => setMessage(""), 2500);
  };

  const handleRemoveFromCart = (id: string) => {
    removeFromCart(id);
    setMessage("Se quitó del carrito");
    setShowFavoriteMessage(true);
    setTimeout(() => setMessage(""), 2500);
  };
const [search, setSearch] = useState("");
  useEffect(() => {
    fetchBooks(search); // actualiza los libros según búsqueda
  }, [search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="home">
      {/* Sección Hero */}
      <section className="home__hero">
        <h1 className="home__title">Bienvenido a la Biblioteca Online</h1>
        <p className="home__subtitle">
          Explora, aparta y administra tus libros favoritos.
        </p>

        <Link to="/libros" className="home__button">
          Ver libros
        </Link>
      </section>

      <section className="home_carousel">
        <Carousel
          images={[
            "https://covers.odilo.io/publicms/bannerNews/banner_reto_lector_diciembre2.png",
          ]}
        ></Carousel>
        
      </section>
      <section className="home__search">
  <input
    type="text"
    className="home__search-input"
    placeholder="Buscar libros…"
    value={search}
    onChange={handleSearchChange}
  />
  <button className="home__search-button" onClick={() => fetchBooks(search)}>
    <FiSearch />
    Buscar
  </button>
</section>
      {/* Sección de categorías */}
      <section className="home__section">
        <h2 className="home__section-title">Categorías</h2>

        <div className="home__grid">
          <div className="home__card">Ficción</div>
          <div className="home__card">Tecnología</div>
          <div className="home__card">Educación</div>
          <div className="home__card">Historia</div>
        </div>
      </section>

      {/* Sección de libros destacados */}
      <section className="home__section">
        <h2 className="home__section-title">Libros destacados</h2>

        {loading && <p>Cargando libros...</p>}
        {error && <ErrorMessage error={error} />}
        {!loading && !error && (
          <BookCarousel
            books={books}
            likedBooks={likedBooks}
            toggleLike={handleToggleLike}
            addToCart={handleAddToCart}
          />
        )}
      </section>

      {/* Sección de libros mas pedidos */}
      <section className="home__section">
        <h2 className="home__section-title">Libros mas pedidos</h2>

        {loading && <p>Cargando libros...</p>}
        {error && <ErrorMessage error={error} />}
        {!loading && !error && (
          <BookCarousel
            books={books}
            likedBooks={likedBooks}
            toggleLike={handleToggleLike}
            addToCart={handleAddToCart}
          />
        )}
      </section>

      {/* Carrusel dinámico desde tu backend */}
      <section className="home__section">
        <h2 className="home__section-title">Recomendados</h2>
        {loading && <p>Cargando libros...</p>}
        {error && <ErrorMessage error={error} />}
        {!loading && !error && (
          <BookCarousel
            books={books}
            likedBooks={likedBooks}
            toggleLike={handleToggleLike}
            addToCart={handleAddToCart}
          />
        )}
      </section>

      {/* SECCIÓN ABOUT */}
      <section className="home__section">
        <h2 className="home__section-title">Sobre la biblioteca</h2>
        <div className="home__section-content">
          <p>
            Esta plataforma permite apartar libros en línea, consultar
            disponibilidad, gestionar tus préstamos y recibir recomendaciones
            personalizadas.
          </p>
        </div>
      </section>

      {showFavoriteMessage && <ErrorMessage error={message} />}
    </div>
  );
};

export default HomePage;
