import axiosService from 'axios';
import type { ILoginBody } from '../interfaces';
import { GOOGLE_REDIRECT_URI } from '../constants';

class AuthApiService {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    getGoogleLoginLink() {
        return axiosService.get(`${this.baseUrl}/google-login-url`, {
            params: {
                redirectUri: GOOGLE_REDIRECT_URI,
            },
        });
    }
    
    loginByGoogle(loginBody: ILoginBody) {
        return axiosService.post(`${this.baseUrl}/google-login`, loginBody);
    }
}
export const authApiService = new AuthApiService(
    `${import.meta.env.VUE_APP_API_URL}/auth` as string
);
