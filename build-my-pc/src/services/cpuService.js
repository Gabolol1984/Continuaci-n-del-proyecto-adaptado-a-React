import { apiRequest } from './api';

export const obtenerCPUs = () => {
    return apiRequest('/api/cpu');
};

export const obtenerCPU = (id) => {
    return apiRequest(`/api/cpu/${id}`);
};