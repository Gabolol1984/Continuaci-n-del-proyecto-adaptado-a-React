import React from 'react';

export default function FloatingButton({ onClick }) {
  return (
    <button
      type="button"
      className="btn-flotante"
      aria-label="Abrir sección de mantenimiento"
      onClick={onClick}
      title="Sección en construcción"
    >
      <img src="/img/flotante.png" alt="Icono flotante" />
    </button>
  );
}
