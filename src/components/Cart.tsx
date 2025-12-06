import React, { useState } from "react";
import "./Cart.css";

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onRemoveItem?: (id: string) => void;
  onCheckout?: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemoveItem, onCheckout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const toggleCart = () => setIsOpen(!isOpen);

  return (
    <div className="cart">
      <div className="cart__icon" onClick={toggleCart}>
        🛒
        {totalItems > 0 && <span className="cart__count">{totalItems}</span>}
      </div>

      {isOpen && (
        <div className="cart__dropdown">
          {items.length === 0 ? (
            <p className="cart__empty">El carrito está vacío</p>
          ) : (
            <div className="cart__items-container">
              {items.map((item) => (
                <div key={item.id} className="cart__item">
                  <span>{item.name} x {item.quantity}</span>
                  {onRemoveItem && (
                    <button
                      className="cart__remove"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      ✖
                    </button>
                  )}
                </div>
              ))}

              {onCheckout && (
                <button
                  className="cart__checkout"
                  onClick={onCheckout}
                >
                  Ir a pagar
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
