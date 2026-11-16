import { apiRequest } from './api';

export const obtenerGPUs = () => {
    return apiRequest('/api/gpu');
};

export const obtenerGPU = (id) => {
    return apiRequest(`/api/gpu/${id}`);
};