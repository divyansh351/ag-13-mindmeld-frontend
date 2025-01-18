import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    login: async (credentials) => {
        const response = await api.post('/api/users/login', credentials);
        localStorage.setItem('token', response.data.token);
        return response.data;
    },

    register: async (userData) => {
        const response = await api.post('/api/users/register', userData);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
    }
};

export const userService = {
    getProfile: async () => {
        const response = await api.get('/api/users/profile');
        return response.data;
    },

    updateProgress: async (progressData) => {
        const response = await api.post('/api/users/progress/update', progressData);
        return response.data;
    },

    getStreak: async () => {
        const response = await api.get('/api/users/streak');
        return response.data;
    },

    getSkills: async () => {
        const response = await api.get('/api/users/skills');
        return response.data;
    },

    updateSkills: async (skillData) => {
        const response = await api.put('/api/users/skills', skillData);
        return response.data;
    }
};