import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface FormLoginProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export const FormLogin: React.FC<FormLoginProps> = ({ onSuccess, onSwitchToRegister }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError('El nombre de usuario es obligatorio.');
      return;
    }
    if (!password) {
      setError('La contraseña es obligatoria.');
      return;
    }

    setLoading(true);
    try {
      await login({ username: username.trim(), password });
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setError(err?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      {error && <div style={errorStyle}>{error}</div>}

      <div style={fieldGroupStyle}>
        <label htmlFor="login-username" style={labelStyle}>
          Nombre de usuario
        </label>
        <input
          id="login-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingresa tu usuario"
          disabled={loading}
          required
          style={inputStyle}
        />
      </div>

      <div style={fieldGroupStyle}>
        <label htmlFor="login-password" style={labelStyle}>
          Contraseña
        </label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          disabled={loading}
          required
          style={inputStyle}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          ...submitButtonStyle,
          opacity: loading ? 0.6 : 1,
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </button>

      {onSwitchToRegister && (
        <p style={footerTextStyle}>
          ¿No tienes una cuenta?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            style={linkButtonStyle}
          >
            Regístrate aquí
          </button>
        </p>
      )}
    </form>
  );
};

interface FormRegisterProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export const FormRegister: React.FC<FormRegisterProps> = ({ onSuccess, onSwitchToLogin }) => {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setError('El nombre de usuario es obligatorio.');
      return;
    }

    if (password.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    try {
      await register({ username: trimmedUsername, password });
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setError(err?.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      {error && <div style={errorStyle}>{error}</div>}

      <div style={fieldGroupStyle}>
        <label htmlFor="reg-username" style={labelStyle}>
          Nombre de usuario
        </label>
        <input
          id="reg-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Elige tu nombre de usuario"
          disabled={loading}
          required
          style={inputStyle}
        />
      </div>

      <div style={fieldGroupStyle}>
        <label htmlFor="reg-password" style={labelStyle}>
          Contraseña (mínimo 4 caracteres)
        </label>
        <input
          id="reg-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          disabled={loading}
          required
          style={inputStyle}
        />
      </div>

      <div style={fieldGroupStyle}>
        <label htmlFor="reg-confirm-password" style={labelStyle}>
          Confirmar Contraseña
        </label>
        <input
          id="reg-confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          disabled={loading}
          required
          style={inputStyle}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          ...submitButtonStyle,
          opacity: loading ? 0.6 : 1,
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
      </button>

      {onSwitchToLogin && (
        <p style={footerTextStyle}>
          ¿Ya tienes cuenta?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            style={linkButtonStyle}
          >
            Inicia sesión aquí
          </button>
        </p>
      )}
    </form>
  );
};

export const AuthModal: React.FC = () => {
  const { isModalOpen, modalTab, openModal, closeModal } = useAuth();

  if (!isModalOpen) return null;

  return (
    <div style={backdropStyle} onClick={closeModal} role="dialog" aria-modal="true">
      <div style={modalContainerStyle} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={closeModal}
          style={closeButtonStyle}
          aria-label="Cerrar modal"
        >
          &times;
        </button>

        {/* Tabs de navegación */}
        <div style={tabsContainerStyle}>
          <button
            type="button"
            onClick={() => openModal('login')}
            style={{
              ...tabButtonStyle,
              ...(modalTab === 'login' ? activeTabStyle : {}),
            }}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={() => openModal('register')}
            style={{
              ...tabButtonStyle,
              ...(modalTab === 'register' ? activeTabStyle : {}),
            }}
          >
            Crear cuenta
          </button>
        </div>

        {/* Contenido del Tab */}
        <div style={{ marginTop: '1.25rem' }}>
          {modalTab === 'login' ? (
            <FormLogin
              onSuccess={closeModal}
              onSwitchToRegister={() => openModal('register')}
            />
          ) : (
            <FormRegister
              onSuccess={closeModal}
              onSwitchToLogin={() => openModal('login')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

// Estilos integrados alineados con el tema general
const backdropStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  backdropFilter: 'blur(4px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
  padding: '1rem',
};

const modalContainerStyle: React.CSSProperties = {
  position: 'relative',
  backgroundColor: 'var(--superficie, #1e293b)',
  borderRadius: 'var(--radio, 12px)',
  border: '1px solid var(--borde, #334155)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
  width: '100%',
  maxWidth: '440px',
  padding: '2rem',
  color: 'var(--texto, #edf2e6)',
};

const closeButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '12px',
  right: '16px',
  background: 'none',
  border: 'none',
  color: 'var(--texto-suave, #94a3b8)',
  fontSize: '1.8rem',
  cursor: 'pointer',
  lineHeight: 1,
};

const tabsContainerStyle: React.CSSProperties = {
  display: 'flex',
  borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
  marginBottom: '1rem',
};

const tabButtonStyle: React.CSSProperties = {
  flex: 1,
  padding: '0.75rem 0.5rem',
  background: 'none',
  border: 'none',
  borderBottom: '2px solid transparent',
  marginBottom: '-2px',
  color: 'var(--texto-suave, #94a3b8)',
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

const activeTabStyle: React.CSSProperties = {
  color: 'var(--primario, #76b900)',
  borderBottom: '2px solid var(--primario, #76b900)',
};

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const fieldGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.35rem',
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  fontWeight: 500,
  color: 'var(--texto-suave, #cbd5e1)',
};

const inputStyle: React.CSSProperties = {
  backgroundColor: 'var(--superficie-2, #0f172a)',
  color: 'var(--texto, #edf2e6)',
  border: '1px solid var(--borde, #475569)',
  borderRadius: '8px',
  padding: '0.7rem 0.9rem',
  fontSize: '0.95rem',
  outline: 'none',
  width: '100%',
};

const submitButtonStyle: React.CSSProperties = {
  backgroundColor: 'var(--primario, #76b900)',
  color: '#101410',
  fontWeight: 'bold',
  padding: '0.8rem',
  borderRadius: '8px',
  border: 'none',
  fontSize: '1rem',
  marginTop: '0.5rem',
  transition: 'all 0.2s ease',
};

const errorStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255, 92, 92, 0.15)',
  color: 'var(--error, #ff5c5c)',
  border: '1px solid var(--error, #ff5c5c)',
  padding: '0.65rem 0.9rem',
  borderRadius: '8px',
  fontSize: '0.88rem',
};

const footerTextStyle: React.CSSProperties = {
  fontSize: '0.88rem',
  textAlign: 'center',
  color: 'var(--texto-suave, #94a3b8)',
  marginTop: '0.5rem',
};

const linkButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'var(--primario, #76b900)',
  cursor: 'pointer',
  fontWeight: 600,
  textDecoration: 'underline',
  padding: 0,
  fontFamily: 'inherit',
  fontSize: 'inherit',
};
