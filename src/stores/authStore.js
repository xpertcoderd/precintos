import { defineStore } from 'pinia';
import { login, logout, checkSession } from '@/services/authService';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        isAuthenticated: false,
    }),
    actions: {
        async login(credentials) {
            const response = await login(credentials);
            // Assuming response.success is true if we get here (due to interceptor throwing on error? No, interceptor returns data)
            // Wait, my interceptor returns response.data.
            // If the API returns { success: true, data: user }, then response is that object.
            if (response.success) {
                this.user = response.data;
                this.isAuthenticated = true;
            }
            return response;
        },
        async checkAuth() {
            try {
                const response = await checkSession();
                if (response.success) {
                    this.user = response.data;
                    this.isAuthenticated = true;
                } else {
                    this.user = null;
                    this.isAuthenticated = false;
                }
            } catch (error) {
                this.user = null;
                this.isAuthenticated = false;
            }
        },
        async logout() {
            try {
                await logout();
            } finally {
                this.user = null;
                this.isAuthenticated = false;
            }
        },
    },
    persist: true,
});
