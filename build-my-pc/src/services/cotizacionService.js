import { apiRequest } from './api';

// Obtener todas las cotizaciones
export const obtenerCotizaciones = () => {
    return apiRequest('/api/cotizacion');
};

// Obtener una cotización por ID
export const obtenerCotizacion = (id) => {
    return apiRequest(`/api/cotizacion/${id}`);
};

// Crear una cotización
export const crearCotizacion = (cotizacion) => {
    return apiRequest('/api/cotizacion', {
        method: 'POST',
        body: JSON.stringify(cotizacion)
    });
};

// Actualizar una cotización
export const actualizarCotizacion = (id, cotizacion) => {
    return apiRequest(`/api/cotizacion/${id}`, {
        method: 'PUT',
        body: JSON.stringify(cotizacion)
    });
};

// Eliminar una cotización
export const eliminarCotizacion = (id) => {
    return apiRequest(`/api/cotizacion/${id}`, {
        method: 'DELETE'
    });
};