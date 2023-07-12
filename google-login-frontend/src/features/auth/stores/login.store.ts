import { reactive, ref } from 'vue';
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
    
    const googleLoginUrl = ref('');

    async function getGoogleLoginUrl() {
        const response = await authApiService.getGoogleLoginLink();
        if (response?.status === HttpStatus.OK) {
            const { data } = response;
            googleLoginUrl.value = data.data.loginUrl;
        } else {
            googleLoginUrl.value = '';
        }
    }

    async function login(body: ILoginBody) {
        const response = await authApiService.loginByGoogle(body);

        if (response?.status === HttpStatus.OK) {
            const { profile, accessToken, refreshToken } = response?.data?.data || {};
            // set login user to app store
            loginUser.email = profile.email;
            // set login user to localStorage
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

    function resetLoginUser() {
        loginUser.email = '';
    }

    return {
        loginUser,
        googleLoginUrl,
        login,
        getGoogleLoginUrl,
        resetLoginUser,
    };
});
