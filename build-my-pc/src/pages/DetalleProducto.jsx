import React from 'react';
import { inventarioComponentes, formatearCLP } from '../data/componentes';

export default function DetalleProducto({ productoId, onVolver, onAgregarABuild }) {
  const producto = inventarioComponentes.find((p) => p.id === productoId) || inventarioComponentes[0];

  return (
    <main className="contenedor">
      {/* BOTÓN VOLVER */}
      <div style={{ marginBottom: '24px' }}>
        <button
          type="button"
          className="btn-plantilla"
          onClick={onVolver}
        >
          &larr; Volver al Catálogo
        </button>
      </div>

      <section className="panel" style={{ padding: '32px' }}>
        <div className="rejilla" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', alignItems: 'center', gap: '32px' }}>
          {/* IMAGEN Y ESTADO */}
          <article className="tarjeta centrado" style={{ padding: '24px' }}>
            <img
              src={producto.imagen}
              alt={`${producto.marca} ${producto.modelo}`}
              style={{
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                borderRadius: 'var(--radio-borde)',
                marginBottom: '16px'
              }}
            />
            <div className="temas">
              <span>{producto.tipo}</span>
              {producto.descontinuado ? (
                <span style={{ color: 'var(--error)', fontWeight: 'bold' }}>[Descontinuado]</span>
              ) : (
                <span style={{ color: 'var(--primario)' }}>Disponible en Stock</span>
              )}
            </div>
          </article>

          {/* INFORMACIÓN Y ESPECIFICACIONES */}
          <article>
            <span className="etiqueta">{producto.marca}</span>
            <h2 style={{ color: 'var(--primario)', fontSize: '2rem', margin: '8px 0 12px' }}>
              {producto.marca} {producto.modelo}
            </h2>
            <p style={{ color: 'var(--texto-suave)', fontSize: '1.05rem', marginBottom: '24px' }}>
              {producto.descripcion}
            </p>

            {/* TABLA DE ESPECIFICACIONES TÉCNICAS */}
            <div className="panel" style={{ background: 'var(--superficie-2)', padding: '20px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '14px', borderBottom: '1px solid var(--borde)', paddingBottom: '6px' }}>
                Especificaciones Técnicas
              </h3>
              <ul style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {producto.especificaciones ? (
                  Object.entries(producto.especificaciones).map(([clave, valor]) => (
                    <li key={clave} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px' }}>
                      <span style={{ color: 'var(--texto-suave)' }}>{clave}:</span>
                      <strong style={{ color: 'var(--texto)' }}>{valor}</strong>
                    </li>
                  ))
                ) : (
                  <li>
                    <span style={{ color: 'var(--texto-suave)' }}>Tipo:</span> <strong>{producto.tipo}</strong>
                  </li>
                )}
              </ul>
            </div>

            {/* PRECIO Y ACCIONES */}
            <div className="acciones" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--texto-suave)' }}>Precio unitario (CLP)</span>
                <p style={{ fontSize: '1.9rem', fontWeight: 'bold', color: 'var(--primario)', margin: 0 }}>
                  {formatearCLP(producto.precio)}
                </p>
              </div>

              <button
                type="button"
                className="boton-primario"
                disabled={producto.descontinuado}
                onClick={() => onAgregarABuild(producto)}
                title={producto.descontinuado ? 'No disponible para armar' : 'Añadir este componente al Armador'}
              >
                + Agregar a mi Build
              </button>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
