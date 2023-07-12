import { PageName } from '@/common/constants';
import { type RouteRecordRaw } from 'vue-router';
import AuthLayout from '../../layouts/AuthLayout.vue';
import GoogleRedirectPage from './pages/GoogleRedirectPage.vue';
import LoginPage from './pages/LoginPage.vue';

const authRouters: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: AuthLayout,
        children: [
            {
                path: '/login',
                name: PageName.LOGIN_PAGE,
                component: LoginPage,
                meta: {
                    onlyWhenLoggedOut: true,
                    public: true,
                },
            },
            {
                path: '/google-login',
                name: PageName.GOOGLE_LOGIN_PAGE,
                component: GoogleRedirectPage,
                meta: {
                    onlyWhenLoggedOut: true,
                    public: true,
                },
            },
        ],
    },
];

export default authRouters;
