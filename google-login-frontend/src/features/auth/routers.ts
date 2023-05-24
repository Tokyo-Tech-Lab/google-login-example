import { PageName } from '@/common/constants';
import { type RouteRecordRaw } from 'vue-router';
import AuthLayout from '../../layouts/AuthLayout.vue';
import LoginWithGooglePage from './pages/LoginWithGooglePage.vue';
import GoogleLoginPage from './pages/GoogleLoginPage.vue';

const authRouters: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: AuthLayout,
        children: [
            {
                path: '/login',
                name: PageName.LOGIN_PAGE,
                component: LoginWithGooglePage,
                meta: {
                    onlyWhenLoggedOut: true,
                    public: true,
                },
            },
            {
                path: '/google-login',
                name: PageName.GOOGLE_LOGIN_PAGE,
                component: GoogleLoginPage,
                meta: {
                    onlyWhenLoggedOut: true,
                    public: true,
                },
            },
        ],
    },
];

export default authRouters;
