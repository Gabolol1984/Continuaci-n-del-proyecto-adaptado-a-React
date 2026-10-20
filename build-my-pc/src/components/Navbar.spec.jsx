import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar.jsx';

describe('Componente <Navbar />', () => {
  
  // Creamos una función simulada para que el componente no falle al hacer clic
  const mockSetPaginaActual = () => {};

  it('debería renderizarse correctamente en el documento', () => {
    render(<Navbar paginaActual="inicio" setPaginaActual={mockSetPaginaActual} />);
    
    const elementoNavbar = screen.getByText(/Inicio/i); 
    expect(elementoNavbar).toBeTruthy(); 
  });

  it('debería contener el botón al catálogo', () => {
  render(<Navbar paginaActual="inicio" setPaginaActual={mockSetPaginaActual} />);

  const botonCatalogo = screen.getByRole('button', { name: /Catálogo/i });
  expect(botonCatalogo).toBeTruthy();
});
  
});
