import React from 'react';
import { FormRegister } from '../components/AuthModal';

interface RegisterPageProps {
  onNavigate?: (page: string) => void;
  setPaginaActual?: (page: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate, setPaginaActual }) => {
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

  const handleSwitchToLogin = () => {
    if (window.history.pushState) {
      window.history.pushState({}, '', '/login');
    }
    if (setPaginaActual) {
      setPaginaActual('login');
    } else if (onNavigate) {
      onNavigate('login');
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
          Crear Cuenta
        </h2>
        <p
          style={{
            textAlign: 'center',
            color: 'var(--texto-suave, #94a3b8)',
            marginBottom: '1.5rem',
            fontSize: '0.95rem',
          }}
        >
          Regístrate para guardar y personalizar tus builds
        </p>

        <FormRegister
          onSuccess={handleSuccess}
          onSwitchToLogin={handleSwitchToLogin}
        />
      </div>
    </main>
  );
};

export default RegisterPage;
