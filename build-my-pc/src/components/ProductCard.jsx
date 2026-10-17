import React from 'react';
import { formatearCLP } from '../data/componentes';

export default function ProductCard({ producto, onSeleccionar, onVerDetalle }) {
  const { id, marca, modelo, tipo, precio, descripcion, imagen, descontinuado } = producto;

  return (
    <article className="tarjeta">
      <div 
        style={{ cursor: 'pointer' }}
        onClick={() => onVerDetalle && onVerDetalle(id)}
      >
        <img
          src={imagen}
          alt={`${marca} ${modelo}`}
          style={{
            width: '100%',
            height: '180px',
            objectFit: 'cover',
            borderRadius: '6px',
            marginBottom: '12px'
          }}
        />
      </div>

      <div className="temas">
        <span>{tipo}</span>
        {descontinuado ? (
          <span style={{ color: 'var(--error)', fontWeight: 'bold' }}>[Descontinuado]</span>
        ) : (
          <span style={{ color: 'var(--primario)' }}>Disponible</span>
        )}
      </div>

      <h3 style={{ margin: '10px 0 6px' }}>
        <button
          type="button"
          onClick={() => onVerDetalle && onVerDetalle(id)}
          style={{
            background: 'none',
            border: 'none',
            color: 'inherit',
            fontSize: 'inherit',
            fontWeight: 'bold',
            textAlign: 'left',
            cursor: 'pointer',
            padding: 0
          }}
        >
          {marca} {modelo}
        </button>
      </h3>

      <p>{descripcion}</p>

      <div className="acciones">
        <p
          className="precio"
          style={{
            fontSize: '1.3rem',
            fontWeight: 'bold',
            color: 'var(--primario)',
            margin: 0
          }}
        >
          {formatearCLP(precio)}
        </p>

        <button
          type="button"
          className="btn-resuelto"
          disabled={descontinuado}
          onClick={() => onSeleccionar && onSeleccionar(producto)}
          title={descontinuado ? 'Componente no disponible para armado' : 'Agregar a la Build'}
        >
          + Agregar
        </button>
      </div>
    </article>
  );
}
