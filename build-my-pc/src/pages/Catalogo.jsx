import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ paginaActual, setPaginaActual }) {
  const { user, logout, openModal } = useAuth();
  const roles = user?.roles ?? [];
  const esAdmin = roles.includes('ROLE_ADMIN');

  const enlaces = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'catalogo', label: 'Catálogo' },
    { id: 'builds', label: 'MisBuilds' },
    { id: 'compatibilidad', label: 'Compatibilidad' },
    { id: 'cotizacion', label: 'Cotización' },
  ];
  if (esAdmin) enlaces.push({ id: 'admin', label: 'Administración' });

  return (
      <header>
        <div
            className="contenedor-header"
            onClick={() => {
              if (window.history.pushState) window.history.pushState({}, '', '/');
              setPaginaActual('inicio');
            }}
            title="Volver a Inicio"
        >
          <h1>BuildMyPC</h1>
          <p>Construye tu computador ideal</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <nav aria-label="Navegación principal">
            <ul>
              {enlaces.map((enlace) => (
                  <li key={enlace.id}>
                    <button
                        type="button"
                        className={`nav-link ${paginaActual === enlace.id ? 'activo' : ''}`}
                        onClick={() => {
                          if (window.history.pushState) window.history.pushState({}, '', `/${enlace.id === 'inicio' ? '' : enlace.id}`);
                          setPaginaActual(enlace.id);
                        }}
                    >
                      {enlace.label}
                    </button>
                  </li>
              ))}
            </ul>
          </nav>

          {/* Controles de Autenticación al lado derecho */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {user ? (
                <>
              <span style={{ color: 'var(--texto)', fontWeight: 600, fontSize: '0.95rem' }}>
                Hola, <strong style={{ color: 'var(--primario)' }}>{user.username}</strong>
              </span>
                  <button
                      type="button"
                      onClick={logout}
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--error, #ff5c5c)',
                        color: 'var(--error, #ff5c5c)',
                        padding: '0.45rem 0.9rem',
                        borderRadius: 'var(--radio-borde, 8px)',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--error, #ff5c5c)';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--error, #ff5c5c)';
                      }}
                  >
                    Cerrar sesión
                  </button>
                </>
            ) : (
                <>
                  <button
                      type="button"
                      onClick={() => openModal('login')}
                      className="nav-link"
                      style={{
                        border: '1px solid var(--borde, #475569)',
                        padding: '0.45rem 0.85rem',
                        borderRadius: 'var(--radio-borde, 8px)',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                      }}
                  >
                    Iniciar sesión
                  </button>
                  <button
                      type="button"
                      onClick={() => openModal('register')}
                      style={{
                        backgroundColor: 'var(--primario, #76b900)',
                        color: '#101410',
                        border: 'none',
                        padding: '0.45rem 0.9rem',
                        borderRadius: 'var(--radio-borde, 8px)',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.filter = 'brightness(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.filter = 'none';
                      }}
                  >
                    Crear cuenta
                  </button>
                </>
            )}
          </div>
        </div>
      </header>
  );
}
