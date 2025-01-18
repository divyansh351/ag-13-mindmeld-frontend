import { api } from './api';

export const testService = {
    // Get all tests
    getAllTests: async () => {
        const response = await api.get('/api/tests/all');
        return response.data;
    },

    // Get tests by type
    getTestsByType: async (testType) => {
        const response = await api.get(`/api/tests/type/${testType}`);
        return response.data;
    },

    // Memory Tests
    getMemoryTest: async (testId) => {
        const response = await api.get(`/api/tests/memory/${testId}`);
        return response.data;
    },

    submitMemoryTest: async (testId, data) => {
        const response = await api.post(`/api/tests/memory/${testId}/submit`, data);
        return response.data;
    },

    // Attention Tests
    getAttentionTest: async (testId) => {
        const response = await api.get(`/api/tests/attention/${testId}`);
        return response.data;
    },

    submitAttentionTest: async (testId, data) => {
        const response = await api.post(`/api/tests/attention/${testId}/submit`, data);
        return response.data;
    },

    // Focus Tests
    getFocusTest: async (testId) => {
        const response = await api.get(`/api/tests/focus/${testId}`);
        return response.data;
    },

    submitFocusTest: async (testId, data) => {
        const response = await api.post(`/api/tests/focus/${testId}/submit`, data);
        return response.data;
    },

    // Reaction Tests
    getReactionTest: async (testId) => {
        const response = await api.get(`/api/tests/reaction/${testId}`);
        return response.data;
    },

    submitReactionTest: async (testId, data) => {
        const response = await api.post(`/api/tests/reaction/${testId}/submit`, data);
        return response.data;
    },

    // Problem Tests
    getProblemTest: async (testId) => {
        const response = await api.get(`/api/tests/problem/${testId}`);
        return response.data;
    },

    submitProblemTest: async (testId, data) => {
        const response = await api.post(`/api/tests/problem/${testId}/submit`, data);
        return response.data;
    }
};