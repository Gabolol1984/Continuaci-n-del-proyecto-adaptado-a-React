
import { apiRequest } from './api';

export const obtenerUsuarios = (options = {}) => {
    return apiRequest('/api/v1/usuarios', options);
};
