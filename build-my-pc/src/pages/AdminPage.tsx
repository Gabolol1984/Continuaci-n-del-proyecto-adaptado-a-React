import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { obtenerUsuarios } from '../services/usuarioService';

interface UsuarioItem {
  usuarioId: number;
  username: string;
  roles: string[];
}

interface AdminPageProps {
  setPaginaActual?: (page: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ setPaginaActual }) => {
  const { user } = useAuth();
  const roles = Array.isArray(user?.roles) ? user.roles : [];
  const esAdmin = roles.includes('ROLE_ADMIN');

  const [usuarios, setUsuarios] = useState<UsuarioItem[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const cargarUsuarios = useCallback(async () => {
    if (!esAdmin) return;
    setCargando(true);
    setError(null);
    try {
      const lista = await obtenerUsuarios();
      setUsuarios(lista);
    } catch (err: any) {
      setError(err?.message || 'Error al obtener la lista de usuarios.');
    } finally {
      setCargando(false);
    }
  }, [esAdmin]);

  useEffect(() => {
    if (esAdmin) {
      cargarUsuarios();
    }
  }, [esAdmin, cargarUsuarios]);

  const volverInicio = () => {
    if (window.history.pushState) {
      window.history.pushState({}, '', '/');
    }
    setPaginaActual?.('inicio');
  };

  if (!esAdmin) {
    return (
      <main className="contenedor" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '55vh' }}>
        <div
          style={{
            maxWidth: '480px',
            width: '100%',
            backgroundColor: 'var(--superficie, #1e293b)',
            border: '1px solid var(--error, #ff5c5c)',
            borderRadius: 'var(--radio, 12px)',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <h2 style={{ color: 'var(--error, #ff5c5c)', marginBottom: '0.75rem' }}>
            Acceso denegado
          </h2>
          <p style={{ color: 'var(--texto-suave, #94a3b8)', marginBottom: '1.5rem' }}>
            Esta sección es exclusiva para usuarios con rol <strong>ROLE_ADMIN</strong>.
          </p>
          <button type="button" onClick={volverInicio} className="boton-primario">
            Volver al inicio
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="contenedor">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <h2 style={{ color: 'var(--primario, #76b900)', fontSize: '1.8rem' }}>
            Panel de Administración
          </h2>
          <p style={{ color: 'var(--texto-suave, #94a3b8)', fontSize: '0.95rem' }}>
            Usuarios registrados en el sistema ({usuarios.length})
          </p>
        </div>

        <button
          type="button"
          onClick={cargarUsuarios}
          disabled={cargando}
          className="boton-primario"
          style={{ opacity: cargando ? 0.6 : 1 }}
        >
          {cargando ? 'Cargando...' : 'Actualizar'}
        </button>
      </div>

      {error && (
        <div
          style={{
            backgroundColor: 'rgba(255, 92, 92, 0.15)',
            color: 'var(--error, #ff5c5c)',
            border: '1px solid var(--error, #ff5c5c)',
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radio-borde, 8px)',
            marginBottom: '1.25rem',
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          backgroundColor: 'var(--superficie, #1e293b)',
          borderRadius: 'var(--radio, 12px)',
          border: '1px solid var(--borde, #334155)',
          overflowX: 'auto',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--primario, #76b900)', backgroundColor: 'var(--superficie-2, #273449)' }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Usuario</th>
              <th style={thStyle}>Roles</th>
            </tr>
          </thead>
          <tbody>
            {cargando && usuarios.length === 0 ? (
              <tr>
                <td colSpan={3} style={emptyCellStyle}>
                  Cargando usuarios...
                </td>
              </tr>
            ) : usuarios.length === 0 ? (
              <tr>
                <td colSpan={3} style={emptyCellStyle}>
                  No hay usuarios registrados.
                </td>
              </tr>
            ) : (
              usuarios.map((u) => (
                <tr key={u.usuarioId} style={{ borderBottom: '1px solid rgba(133, 142, 155, 0.25)' }}>
                  <td style={tdStyle}>{u.usuarioId}</td>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{u.username}</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {(u.roles || []).map((rol) => (
                        <span
                          key={rol}
                          style={{
                            padding: '0.2rem 0.6rem',
                            borderRadius: '999px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            backgroundColor:
                              rol === 'ROLE_ADMIN'
                                ? 'rgba(118, 185, 0, 0.2)'
                                : 'rgba(148, 163, 184, 0.2)',
                            color:
                              rol === 'ROLE_ADMIN'
                                ? 'var(--acento, #B4FF3C)'
                                : 'var(--texto, #EDF2E6)',
                            border:
                              rol === 'ROLE_ADMIN'
                                ? '1px solid var(--primario, #76b900)'
                                : '1px solid rgba(148, 163, 184, 0.4)',
                          }}
                        >
                          {rol}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

const thStyle: React.CSSProperties = {
  padding: '0.9rem 1rem',
  color: 'var(--texto, #EDF2E6)',
  fontWeight: 700,
  fontSize: '0.95rem',
};

const tdStyle: React.CSSProperties = {
  padding: '0.85rem 1rem',
  color: 'var(--texto, #EDF2E6)',
  fontSize: '0.95rem',
};

const emptyCellStyle: React.CSSProperties = {
  padding: '2rem 1rem',
  textAlign: 'center',
  color: 'var(--texto-suave, #94a3b8)',
};

export default AdminPage;
