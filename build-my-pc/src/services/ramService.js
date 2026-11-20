import { apiRequest } from './api';

export const obtenerRAMs = () => {
    return apiRequest('/api/v2/ram');
};

export const obtenerRAM = (id) => {
    return apiRequest(`/api/v2/ram/${id}`);
};