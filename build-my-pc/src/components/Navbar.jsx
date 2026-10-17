import React from 'react';

export default function Navbar({ paginaActual, setPaginaActual }) {
  const enlaces = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'catalogo', label: 'Catálogo' },
    { id: 'builds', label: 'MisBuilds' },
    { id: 'compatibilidad', label: 'Compatibilidad' },
    { id: 'cotizacion', label: 'Cotización' },
  ];

  return (
    <header>
      <div 
        className="contenedor-header" 
        onClick={() => setPaginaActual('inicio')}
        title="Volver a Inicio"
      >
        <h1>BuildMyPC</h1>
        <p>Construye tu computador ideal</p>
      </div>

      <nav aria-label="Navegación principal">
        <ul>
          {enlaces.map((enlace) => (
            <li key={enlace.id}>
              <button
                type="button"
                className={`nav-link ${paginaActual === enlace.id ? 'activo' : ''}`}
                onClick={() => setPaginaActual(enlace.id)}
              >
                {enlace.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
