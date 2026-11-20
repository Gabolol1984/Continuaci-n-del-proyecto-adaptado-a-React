import { apiRequest } from './api';

export const obtenerGPUs = () => {
    return apiRequest('/api/v2/gpu');
};

export const obtenerGPU = (id) => {
    return apiRequest(`/api/v2/gpu/${id}`);
};