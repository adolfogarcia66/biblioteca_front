import React, { useRef, useState } from "react";
import "./BookCarousel.css";
import { Book } from "../types";

interface Props {
  books: Book[];
  likedBooks: string[];
  toggleLike: (id: string) => void;
  addToCart: (item: { id: string; name: string; quantity: number }) => void;
}

const BookCarousel: React.FC<Props> = ({
  books,
  likedBooks,
  toggleLike,
  addToCart,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleOpenModal = (id: string) => {
    const book = books.find((b) => b.id === id);
    if (!book) return;
    setSelectedBook(book);
  };
  const closeModal = () => setSelectedBook(null);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="book-carousel-section">
      <div className="book-carousel-container">
        <button className="book-carousel-btn left" onClick={scrollLeft}>
          ‹
        </button>

        <div className="book-carousel" ref={carouselRef}>
          {books.map((book) => (
            <div
              key={book.id}
              className="book-card"
              
            >
              <img
                src={book.coverImageUrl}
                alt={book.title}
                className="book-card__img"
                onClick={() => handleOpenModal(book.id)}
              />
              <div className="book-card__info">
                <h3 className="book-card__title">{book.title}</h3>
                <p className="book-card__author">{book.author}</p>
              </div>
              <div className="book-card__actions">
                <button
                  className="heart-btn"
                  onClick={() => toggleLike(book.id)}
                >
                  {likedBooks.includes(book.id) ? "❤️" : "🤍"}
                </button>

                <button
                  className="cart-btn"
                  onClick={() =>
                    addToCart({
                      id: book.id,
                      name: book.title,
                      quantity: 1,
                    })
                  }
                >
                  🛒
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal fuera del carrusel */}
        {selectedBook && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <img src={selectedBook.coverImageUrl} className="modal-image" />
              <h2>{selectedBook.title}</h2>
              <h3>{selectedBook.author}</h3>
              <p>{selectedBook.description}</p>
              <p>ISBN:{selectedBook.isbn}</p>
              <p>Editorial:{selectedBook.publisher}</p>
              <p>Género:{selectedBook.subject}</p>

              <div className="book-card__actions">
                <button
                  className="heart-btn"
                  onClick={() => toggleLike(selectedBook.id)}
                >
                  {likedBooks.includes(selectedBook.id) ? "❤️" : "🤍"}
                </button>

                <button
                  className="cart-btn"
                  onClick={() =>
                    addToCart({
                      id: selectedBook.id,
                      name: selectedBook.title,
                      quantity: 1,
                    })
                  }
                >
                  🛒
                </button>
              </div>
              <button className="modal-close" onClick={closeModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}
        <button className="book-carousel-btn right" onClick={scrollRight}>
          ›
        </button>
      </div>
    </div>
  );
};

export default BookCarousel;
