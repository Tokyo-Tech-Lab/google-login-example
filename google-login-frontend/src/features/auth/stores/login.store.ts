import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { authApiService } from '../services/auth.api';
import type { ILoginBody } from '../interfaces';
import type { IUser } from '@/common/interfaces';
import localStorageAuthService from '@/common/storages/authStorage';
import { HttpStatus } from '@/common/constants';

export const useLoginStore = defineStore('login', () => {
    const loginUser: IUser = reactive({
        email: '',
    });

    async function getGoogleLoginUrl() {
        return await authApiService.getGoogleLoginLink();
    }

    async function login(body: ILoginBody) {
        const response = await authApiService.loginByGoogle(body);

        if (response?.status === HttpStatus.OK) {
            const { profile, accessToken, refreshToken } = response?.data?.data || {};
            loginUser.email = profile.email;
            localStorageAuthService.setLoginUser(profile);
            localStorageAuthService.setAccessToken(accessToken?.token);
            localStorageAuthService.setAccessTokenExpiredAt(accessToken?.expiresIn);
            localStorageAuthService.setRefreshToken(refreshToken?.token);
            localStorageAuthService.setRefreshTokenExpiredAt(refreshToken?.expiresIn);
        } else {
            loginUser.email = '';
        }

        return response;
    }


    function setLoginUser(user: IUser) {
        loginUser.name = user.name;
        loginUser.email = user.email;
    }

    function resetLoginUser() {
        loginUser.email = '';
    }

    return {
        loginUser,
        login,
        getGoogleLoginUrl,
        setLoginUser,
        resetLoginUser,
    };
});
