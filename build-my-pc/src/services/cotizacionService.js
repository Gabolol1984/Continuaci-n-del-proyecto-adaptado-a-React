import { apiRequest } from './api';

// Obtener todas las cotizaciones
export const obtenerCotizaciones = () => {
    return apiRequest('/api/v1/cotizaciones');
};

// Obtener una cotización por ID
export const obtenerCotizacion = (id) => {
    return apiRequest(`/api/v1/cotizaciones/${id}`);
};

// Crear una cotización
export const crearCotizacion = (cotizacion) => {
    return apiRequest('/api/v1/cotizaciones', {
        method: 'POST',
        body: JSON.stringify(cotizacion)
    });
};

// Las cotizaciones cambian de estado con acciones de negocio explícitas en el backend.
export const aprobarCotizacion = (id) => apiRequest(`/api/v1/cotizaciones/${id}/aprobar`, {
    method: 'PATCH',
});

export const rechazarCotizacion = (id) => apiRequest(`/api/v1/cotizaciones/${id}/rechazar`, {
    method: 'PATCH',
});
