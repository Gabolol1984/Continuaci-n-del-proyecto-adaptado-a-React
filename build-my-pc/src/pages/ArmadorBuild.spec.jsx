import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ArmadorBuild from './ArmadorBuild.jsx';

const buildVacia = { cpu: null, placa: null, ram: null, gpu: null, fuente: null };

// Envoltorio con estado real: ArmadorBuild es un componente controlado,
// así que necesitamos un padre que guarde la build para probar interacciones.
function Envoltorio({ setPaginaActual = () => {} }) {
  const [build, setBuild] = useState(buildVacia);
  return <ArmadorBuild build={build} setBuild={setBuild} setPaginaActual={setPaginaActual} />;
}

// Elige la primera opción real (la 0 es "-- Seleccionar ... --") de un selector
const seleccionarPrimeraOpcion = (etiqueta) => {
  const select = screen.getByLabelText(etiqueta);
  fireEvent.change(select, { target: { value: select.options[1].value } });
};

const seleccionarTodo = () => {
  seleccionarPrimeraOpcion(/Procesador/i);
  seleccionarPrimeraOpcion(/Placa Madre/i);
  seleccionarPrimeraOpcion(/Memoria RAM/i);
  seleccionarPrimeraOpcion(/Tarjeta Gráfica/i);
  seleccionarPrimeraOpcion(/Fuente de Poder/i);
};

describe('Componente <ArmadorBuild />', () => {
  let alertasMostradas;

  beforeEach(() => {
    localStorage.clear();
    alertasMostradas = [];
    window.alert = (mensaje) => alertasMostradas.push(mensaje);
  });

  it('debería renderizarse correctamente en el documento', () => {
    render(<Envoltorio />);

    const titulo = screen.getByText(/Arma tu PC Gamer/i);
    expect(titulo).toBeTruthy();
  });

  it('debería mostrar los 5 selectores de componentes', () => {
    render(<Envoltorio />);

    expect(screen.getAllByRole('combobox').length).toBe(5);
    expect(screen.getByLabelText(/Procesador/i)).toBeTruthy();
    expect(screen.getByLabelText(/Placa Madre/i)).toBeTruthy();
    expect(screen.getByLabelText(/Memoria RAM/i)).toBeTruthy();
    expect(screen.getByLabelText(/Tarjeta Gráfica/i)).toBeTruthy();
    expect(screen.getByLabelText(/Fuente de Poder/i)).toBeTruthy();
  });

  it('debería avisar que faltan componentes al validar con la build vacía', () => {
    render(<Envoltorio />);

    fireEvent.click(screen.getByRole('button', { name: /Validar Compatibilidad/i }));

    expect(alertasMostradas.length).toBe(1);
    expect(alertasMostradas[0]).toMatch(/faltan componentes/i);
  });

  it('debería llamar a setBuild al elegir un componente', () => {
    const llamadas = [];
    const setBuildSimulado = (nueva) => llamadas.push(nueva);

    render(<ArmadorBuild build={buildVacia} setBuild={setBuildSimulado} setPaginaActual={() => {}} />);

    seleccionarPrimeraOpcion(/Procesador/i);

    expect(llamadas.length).toBe(1);
    expect(llamadas[0].cpu).toBeTruthy();
    expect(llamadas[0].placa).toBeNull();
  });

  it('debería guardar la build en localStorage al seleccionar un componente', () => {
    render(<Envoltorio />);

    seleccionarPrimeraOpcion(/Procesador/i);

    const guardado = JSON.parse(localStorage.getItem('buildSeleccionada'));
    expect(guardado).toBeTruthy();
    expect(guardado.cpu).toBeTruthy();
  });

  it('debería mostrar el botón de reiniciar solo cuando hay algo seleccionado', () => {
    render(<Envoltorio />);

    expect(screen.queryByRole('button', { name: /Reiniciar Configuración/i })).toBeNull();

    seleccionarPrimeraOpcion(/Procesador/i);

    expect(screen.getByRole('button', { name: /Reiniciar Configuración/i })).toBeTruthy();
  });

  it('debería limpiar selectores y localStorage al reiniciar', () => {
    render(<Envoltorio />);

    seleccionarPrimeraOpcion(/Procesador/i);
    fireEvent.click(screen.getByRole('button', { name: /Reiniciar Configuración/i }));

    expect(screen.getByLabelText(/Procesador/i).value).toBe('');
    expect(localStorage.getItem('buildSeleccionada')).toBeNull();
  });

  it('debería mantener deshabilitado "Solicitar Cotización" mientras la build está incompleta', () => {
    render(<Envoltorio />);

    const botonCotizar = screen.getByRole('button', { name: /Solicitar Cotización/i });
    expect(botonCotizar.style.pointerEvents).toBe('none');
  });

  it('debería mostrar una alerta al validar con los 5 componentes seleccionados', () => {
    render(<Envoltorio />);

    seleccionarTodo();
    fireEvent.click(screen.getByRole('button', { name: /Validar Compatibilidad/i }));

    // Puede ser compatible o no según los datos, pero ya no debe decir que faltan componentes
    expect(alertasMostradas.length).toBe(1);
    expect(alertasMostradas[0]).not.toMatch(/faltan componentes/i);
  });
});