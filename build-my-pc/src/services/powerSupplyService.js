
import { apiRequest } from './api';

// Obtener todas las fuentes de poder
export const obtenerFuentesPoder = () => {
    return apiRequest('/api/powerSupply');
};

// Obtener una fuente de poder por ID
export const obtenerFuentePoder = (id) => {
    return apiRequest(`/api/powerSupply/${id}`);
};

// Crear una fuente de poder
export const crearFuentePoder = (fuente) => {
    return apiRequest('/api/powerSupply', {
        method: 'POST',
        body: JSON.stringify(fuente)
    });
};

// Actualizar una fuente de poder
export const actualizarFuentePoder = (id, fuente) => {
    return apiRequest(`/api/powerSupply/${id}`, {
        method: 'PUT',
        body: JSON.stringify(fuente)
    });
};

// Eliminar una fuente de poder
export const eliminarFuentePoder = (id) => {
    return apiRequest(`/api/powerSupply/${id}`, {
        method: 'DELETE'
    });
};
