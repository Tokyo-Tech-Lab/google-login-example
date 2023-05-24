import { PageName } from '@/common/constants';
import MainLayout from '@/layouts/MainLayout.vue';
import type { RouteRecordRaw } from 'vue-router';
import DashboardPage from './pages/DashboardPage.vue';

const dashboardRouters: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '/dashboard',
                name: PageName.DASHBOARD_PAGE,
                component: DashboardPage,
                meta: {
                    requiresAuth: true,
                },
            },
        ],
    },
];

export default dashboardRouters;
