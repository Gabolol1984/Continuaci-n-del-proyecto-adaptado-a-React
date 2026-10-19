import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar.jsx'; // Asegúrate de ajustar la ruta real a tu componente


describe('Componente <Navbar />', () => {
  
  // Test 1: Verificar que el Navbar se dibuja en la pantalla
  it('debería renderizarse correctamente en el documento', () => {
    render(<Navbar />);
    
    // Cambia 'Inicio' por algún texto descriptivo o enlace que tenga tu Navbar real
    const elementoNavbar = screen.getByText(/Inicio/i); 
    expect(elementoNavbar).toBeTruthy(); 
  });

  // Test 2: Verificar si un botón o enlace específico existe
  it('debería contener el enlace al catálogo', () => {
    render(<Navbar />);
    
    // Cambia 'Catalogo' por el texto exacto que tenga tu botón/enlace
    const botonCatalogo = screen.getByRole('link', { name: /Catalogo/i });
    expect(botonCatalogo).toBeTruthy();
  });
  
});
