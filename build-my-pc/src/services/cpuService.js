
import { apiRequest } from './api';

export const obtenerCPUs = (options = {}) => {
    return apiRequest('/api/v2/cpus', options);
};

export const obtenerCPU = (id) => {
    return apiRequest(`/api/v2/cpus/${id}`);
};

export const crearCPU = (cpu) => apiRequest('/api/v2/cpus', {
    method: 'POST',
    body: JSON.stringify(cpu),
});

export const eliminarCPU = (id) => apiRequest(`/api/v2/cpus/${id}`, {
    method: 'DELETE',
});
