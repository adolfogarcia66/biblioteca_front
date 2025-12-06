import React, { useEffect, useState } from "react";
import "./ErrorMessage.css";

interface ErrorMessageProps {
  error: string;
  duration?: number; // duración opcional en ms
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [error, duration]);

  if (!error) return null;

  return (
    <div className={`error-message ${visible ? "error-message--visible" : ""}`}>
      <p className="error-message__text">{error}</p>
    </div>
  );
};

export default ErrorMessage;
