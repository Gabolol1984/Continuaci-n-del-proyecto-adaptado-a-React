
import { apiRequest } from './api';

// Obtener todas las fuentes de poder
export const obtenerFuentesPoder = () => {
    return apiRequest('/api/api/v2/psus');
};

// Obtener una fuente de poder por ID
export const obtenerFuentePoder = (id) => {
    return apiRequest(`/api/v2/psus/${id}`);
};

// Crear una fuente de poder
export const crearFuentePoder = (fuente) => {
    return apiRequest('/api/v2/psus', {
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
