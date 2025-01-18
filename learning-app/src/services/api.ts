import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getUserProfile = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateUserProgress = async (token, progressData) => {
    try {
        const response = await axios.post(`${API_URL}/progress/update`, progressData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateUserStreak = async (token) => {
    try {
        const response = await axios.put(`${API_URL}/streak`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getUserStreak = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/streak`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getUserSkills = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/skills`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateUserSkills = async (token, skillData) => {
    try {
        const response = await axios.put(`${API_URL}/skills`, skillData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};