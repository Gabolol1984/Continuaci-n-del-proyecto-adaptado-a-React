import React from 'react';
import { FormLogin } from '../components/AuthModal';

interface LoginPageProps {
  onNavigate?: (page: string) => void;
  setPaginaActual?: (page: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, setPaginaActual }) => {
  const handleSuccess = () => {
    // Redirección a "/"
    if (window.history.pushState) {
      window.history.pushState({}, '', '/');
    }
    if (setPaginaActual) {
      setPaginaActual('inicio');
    } else if (onNavigate) {
      onNavigate('inicio');
    }
  };

  const handleSwitchToRegister = () => {
    if (window.history.pushState) {
      window.history.pushState({}, '', '/register');
    }
    if (setPaginaActual) {
      setPaginaActual('register');
    } else if (onNavigate) {
      onNavigate('register');
    }
  };

  return (
    <main className="contenedor" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: 'var(--superficie, #1e293b)',
          borderRadius: 'var(--radio, 12px)',
          border: '1px solid var(--borde, #334155)',
          padding: '2.5rem 2rem',
          boxShadow: 'var(--sombra, 0 10px 30px rgba(0,0,0,0.35))',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '0.5rem',
            color: 'var(--primario, #76b900)',
            fontSize: '1.8rem',
          }}
        >
          Iniciar Sesión
        </h2>
        <p
          style={{
            textAlign: 'center',
            color: 'var(--texto-suave, #94a3b8)',
            marginBottom: '1.5rem',
            fontSize: '0.95rem',
          }}
        >
          Ingresa a tu cuenta de BuildMyPC
        </p>

        <FormLogin
          onSuccess={handleSuccess}
          onSwitchToRegister={handleSwitchToRegister}
        />
      </div>
    </main>
  );
};

export default LoginPage;
