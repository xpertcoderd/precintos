import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', {
    state: () => ({
        isSidebarOpen: true,
        theme: 'light',
    }),
    actions: {
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
        setTheme(theme) {
            this.theme = theme;
        },
    },
    persist: true,
});
