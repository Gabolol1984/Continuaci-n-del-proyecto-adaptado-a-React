import { apiRequest } from './api';

export const obtenerBuilds = () => {
    return apiRequest('/api/build');
};

export const obtenerBuild = (id) => {
    return apiRequest(`/api/build/${id}`);
};