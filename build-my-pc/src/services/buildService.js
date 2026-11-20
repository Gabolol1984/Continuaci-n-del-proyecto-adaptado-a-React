import { apiRequest } from './api';

export const obtenerBuilds = () => {
    return apiRequest('/api/v2/builds');
};

export const obtenerBuild = (id) => {
    return apiRequest(`/api/v2/builds/${id}`);
};