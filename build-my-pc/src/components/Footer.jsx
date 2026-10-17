import React from 'react';

export default function Footer({ setPaginaActual }) {
  return (
    <footer>
      <p>
        &copy; 2026 BuildMyPC. Todos los derechos reservados.
      </p>
      <p style={{ marginTop: '4px' }}>Contacto: contacto@buildmypc.cl</p>

      <nav aria-label="Navegación secundaria">
        <ul>
          <li>
            <button 
              type="button" 
              className="nav-link" 
              onClick={() => alert("Puedes escribirnos a contacto@buildmypc.cl")}
            >
              Contacto
            </button>
          </li>
          <li>
            <button 
              type="button" 
              className="nav-link" 
              onClick={() => alert("Términos y condiciones de prueba para BuildMyPC.")}
            >
              Términos y condiciones
            </button>
          </li>
          <li>
            <button 
              type="button" 
              className="nav-link" 
              onClick={() => alert("Política de privacidad: tus datos se guardan sólo localmente en tu navegador.")}
            >
              Política de privacidad
            </button>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
