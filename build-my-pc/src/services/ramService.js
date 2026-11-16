import { apiRequest } from './api';

export const obtenerRAMs = () => {
    return apiRequest('/api/ram');
};

export const obtenerRAM = (id) => {
    return apiRequest(`/api/ram/${id}`);
};