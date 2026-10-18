import React from 'react';

export default function Mantencion({ setPaginaActual }) {
  return (
    <main className="contenedor">
      <section className="panel" style={{ textAlign: 'center', padding: '48px 24px', maxWidth: '800px', margin: '40px auto' }}>
        <span className="etiqueta">Próximamente</span>

        <h1 className="titulo-degradado" style={{ marginTop: '16px', marginBottom: '16px', fontSize: '2.4rem' }}>
          Sección en Construcción
        </h1>

        <p style={{ maxWidth: '550px', margin: '0 auto 28px', color: 'var(--texto-suave)', fontSize: '1.05rem' }}>
          Estamos trabajando en este módulo para ofrecerte las mejores herramientas de optimización,
          benchmarks y prueba técnica para tu PC gamer.
        </p>

        <div style={{ marginBottom: '32px' }}>
          <img
            src="/img/dk.gif"
            alt="Animación de sección en construcción"
            style={{
              maxWidth: '320px',
              width: '100%',
              height: 'auto',
              borderRadius: 'var(--radio-borde)',
              border: '1px solid var(--borde)'
            }}
          />
        </div>

        <div>
          <button
            type="button"
            className="btn-resuelto"
            style={{ display: 'inline-block', width: 'auto', padding: '10px 24px', fontSize: '1rem' }}
            onClick={() => setPaginaActual('inicio')}
          >
            &larr; Volver al Inicio
          </button>
        </div>
      </section>
    </main>
  );
}
