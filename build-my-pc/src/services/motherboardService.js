
import { apiRequest } from './api';

// Obtener todas las placas madre
export const obtenerMotherboards = () => {
    return apiRequest('/api/motherboard');
};

// Obtener una placa madre por ID
export const obtenerMotherboard = (id) => {
    return apiRequest(`/api/motherboard/${id}`);
};

// Crear una placa madre
export const crearMotherboard = (motherboard) => {
    return apiRequest('/api/motherboard', {
        method: 'POST',
        body: JSON.stringify(motherboard)
    });
};

// Actualizar una placa madre
export const actualizarMotherboard = (id, motherboard) => {
    return apiRequest(`/api/motherboard/${id}`, {
        method: 'PUT',
        body: JSON.stringify(motherboard)
    });
};

// Eliminar una placa madre
export const eliminarMotherboard = (id) => {
    return apiRequest(`/api/motherboard/${id}`, {
        method: 'DELETE'
    });
};
