import React, { useState, useMemo } from 'react';
import { inventarioComponentes } from '../data/componentes';
import ProductCard from '../components/ProductCard';

export default function Catalogo({ onAgregarComponente, onVerDetalle }) {
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [errorFiltro, setErrorFiltro] = useState('');

  // Validación y filtrado reactivo
  const componentesFiltrados = useMemo(() => {
    const min = parseFloat(precioMin) || 0;
    const max = parseFloat(precioMax) || Infinity;

    // Validación de coherencia de precios
    if (precioMin !== '' && precioMax !== '' && min > max) {
      setErrorFiltro('El precio mínimo no puede ser mayor al precio máximo.');
      return [];
    } else {
      setErrorFiltro('');
    }

    const termino = textoBusqueda.trim().toLowerCase();

    return inventarioComponentes.filter((prod) => {
      const coincideTexto = (prod.marca + ' ' + prod.modelo + ' ' + prod.descripcion)
        .toLowerCase()
        .includes(termino);
      const coincideTipo = categoriaSeleccionada === 'todos' || prod.tipo === categoriaSeleccionada;
      const coincidePrecio = prod.precio >= min && prod.precio <= max;

      return coincideTexto && coincideTipo && coincidePrecio;
    });
  }, [textoBusqueda, categoriaSeleccionada, precioMin, precioMax]);

  return (
    <main className="contenedor">
      {/* PORTADA Y TITULAR */}
      <section className="portada">
        <span className="etiqueta">Catálogo de Hardware</span>
        <h1 className="titulo-degradado">Componentes Disponibles</h1>
        <p>Filtra y selecciona las piezas compatibles para armar tu configuración personalizada.</p>
      </section>

      {/* PANEL DE FILTROS EN TIEMPO REAL */}
      <section className="panel">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="datos" style={{ alignItems: 'flex-end' }}>
            {/* Buscador por texto */}
            <div style={{ flex: '1 1 220px' }} className="campo-form">
              <label htmlFor="buscar-texto">Buscar componente:</label>
              <input
                type="text"
                id="buscar-texto"
                value={textoBusqueda}
                onChange={(e) => setTextoBusqueda(e.target.value)}
                placeholder="Ej. Intel, Kingston, RTX..."
                autoComplete="off"
              />
            </div>

            {/* Filtro por tipo / categoría */}
            <div style={{ flex: '1 1 180px' }} className="campo-form">
              <label htmlFor="filtro-tipo">Categoría:</label>
              <select
                id="filtro-tipo"
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              >
                <option value="todos">Todas las categorías</option>
                <option value="CPU">Procesadores (CPU)</option>
                <option value="GPU">Tarjetas Gráficas (GPU)</option>
                <option value="RAM">Memorias RAM</option>
                <option value="Placa">Placas Madres</option>
                <option value="Almacenamiento">Almacenamiento</option>
                <option value="Fuente">Fuentes de Poder</option>
              </select>
            </div>

            {/* Rango de Precio Mínimo */}
            <div style={{ flex: '1 1 130px' }} className="campo-form">
              <label htmlFor="precio-min">Precio mín ($):</label>
              <input
                type="number"
                id="precio-min"
                min="0"
                value={precioMin}
                onChange={(e) => setPrecioMin(e.target.value)}
                placeholder="0"
              />
            </div>

            {/* Rango de Precio Máximo */}
            <div style={{ flex: '1 1 130px' }} className="campo-form">
              <label htmlFor="precio-max">Precio máx ($):</label>
              <input
                type="number"
                id="precio-max"
                min="0"
                value={precioMax}
                onChange={(e) => setPrecioMax(e.target.value)}
                placeholder="9999999"
              />
            </div>

            {/* Botón para resetear filtros */}
            {(textoBusqueda || categoriaSeleccionada !== 'todos' || precioMin || precioMax) && (
              <div style={{ marginBottom: '16px' }}>
                <button
                  type="button"
                  className="btn-plantilla"
                  onClick={() => {
                    setTextoBusqueda('');
                    setCategoriaSeleccionada('todos');
                    setPrecioMin('');
                    setPrecioMax('');
                    setErrorFiltro('');
                  }}
                >
                  Limpiar Filtros
                </button>
              </div>
            )}
          </div>

          {/* Mensaje de validación de precios */}
          {errorFiltro && (
            <div className="mensaje-error" style={{ marginTop: '12px' }}>
              ⚠️ {errorFiltro}
            </div>
          )}
        </form>
      </section>

      {/* GRILLA DE PRODUCTOS */}
      <section style={{ marginTop: '36px' }}>
        {componentesFiltrados.length === 0 ? (
          <div className="panel" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <p style={{ color: 'var(--texto-suave)', fontSize: '1.1rem' }}>
              No se encontraron componentes con los filtros aplicados.
            </p>
          </div>
        ) : (
          <div className="rejilla">
            {componentesFiltrados.map((producto) => (
              <ProductCard
                key={producto.id}
                producto={producto}
                onSeleccionar={onAgregarComponente}
                onVerDetalle={onVerDetalle}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}