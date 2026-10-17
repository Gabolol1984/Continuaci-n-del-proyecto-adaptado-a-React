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
          </div>
         </form>
      </section>
      
    </main>
    
  );}
