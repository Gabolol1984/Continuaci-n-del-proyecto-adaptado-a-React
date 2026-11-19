
import { apiRequest } from './api';

export const obtenerCPUs = () => {
    return apiRequest('/api/v2/cpus');
};

export const obtenerCPU = (id) => {
    return apiRequest(`/api/v2/cpus/${id}`);
};
