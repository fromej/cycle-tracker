// frontend/src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw, NavigationGuardWithThis } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import DashboardPage from '@/views/DashboardPage.vue';
import { useAuthStore } from '@/stores/auth';

// Define routes with type annotations
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
        meta: { requiresGuest: true } as { requiresGuest: boolean } // Type the meta field
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage,
        meta: { requiresGuest: true } as { requiresGuest: boolean } // Type the meta field
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardPage,
        meta: { requiresAuth: true } as { requiresAuth: boolean } // Type the meta field
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Type the navigation guard function
router.beforeEach(((to, from, next) => {
    const authStore = useAuthStore();
    const isAuthenticated = authStore.isAuthenticated;

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'login', query: { redirect: to.fullPath } });
    } else if (to.meta.requiresGuest && isAuthenticated) {
        next({ name: 'dashboard' });
    } else {
        next();
    }
}) as NavigationGuardWithThis<undefined>); // Type the context if needed, 'undefined' for composition API guard


export default router;