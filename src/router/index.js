import { createRouter, createWebHistory } from 'vue-router';
import jsCookie from 'js-cookie';

/**
 * Helper function to check if the user is authenticated.
 * It checks for the existence of the authentication cookies from your project.
 * @returns {boolean} True if the user is authenticated, false otherwise.
 */
const isAuthenticated = () => {
  // Using the cookie names found in your LoginPage.vue
  return !!jsCookie.get('userPublicInfo') || !!jsCookie.get('PLAY_SESSION');
};

const routes = [
  // --- Public Routes ---
  {
    path: '/login',
    name: 'Login',
    // Lazy-load the component for better performance.
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginPage.vue'),
    // This guard prevents authenticated users from seeing the login page again.
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        // If logged in, redirect to the main dashboard.
        next({ name: 'DashboardHome' });
      } else {
        next();
      }
    },
  },
  {
    // Redirect the root path to the login page for a clear user flow.
    path: '/',
    redirect: '/login',
  },

  // --- Protected Routes (Dashboard Layout) ---
  {
    path: '/dashboard',
    // This component acts as a layout for all authenticated routes.
    // It contains a <router-view /> to render its children.
    component: () => import(/* webpackChunkName: "dashboard-layout" */ '../views/PrivateDashboard.vue'),
    meta: { requiresAuth: true }, // Mark this route and its children as requiring authentication.
    children: [
      {
        path: '',
        name: 'DashboardHome',
        component: () => import(/* webpackChunkName: "dashboard-home" */ '../views/DashboardHome.vue'),
      },
      {
        path: 'solicitudes',
        name: 'Solicitudes',
        component: () => import(/* webpackChunkName: "solicitudes" */ '../views/SolicitudesPage.vue'),
      },
      {
        path: 'dispositivos',
        name: 'Dispositivos',
        component: () => import(/* webpackChunkName: "dispositivos" */ '../views/DispositivoPage.vue'),
      },
      {
        path: 'tarifas',
        name: 'Tarifas',
        component: () => import(/* webpackChunkName: "tarifas" */ '../views/TarifasPage.vue'),
      },
      {
        path: 'clientes',
        name: 'Clientes',
        component: () => import(/* webpackChunkName: "clientes" */ '../views/ClientesPage.vue'),
      },
      {
        path: 'usuarios',
        name: 'Usuarios',
        component: () => import(/* webpackChunkName: "usuarios" */ '../views/UsuariosPage.vue'),
      },
      {
        path: 'transportistas',
        name: 'Transportistas',
        component: () => import(/* webpackChunkName: "transportistas" */ '../views/TransportistaPage.vue'),
      },
    ],
  },
];

// --- Development-Only Routes ---
// These routes will only be available in your development environment.
if (process.env.NODE_ENV === 'development') {
  const devRoutes = [
    {
      path: '/dev-sockets',
      name: 'DevSockets',
      meta: { requiresAuth: true }, // Also protect dev routes if needed
      component: () => import(/* webpackChunkName: "dev-layout" */ '../views/PrivateDashboard.vue'),
      children: [
        // Add any development-specific routes here
      ]
    }
  ];
  routes.push(...devRoutes);
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// --- Global Navigation Guard ---
// This function runs before every single navigation.
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated()) {
    // If the route requires auth and the user is not logged in,
    // redirect them to the login page.
    next({ name: 'Login' });
  } else {
    // Otherwise, allow the navigation to proceed.
    next();
  }
});

export default router;
