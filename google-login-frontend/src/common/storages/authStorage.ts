import type { IUser } from '@/common/interfaces';
import { DEFAULT_LANGUAGE, SupportLanguage } from '../constants';
import { storage } from './localStorage';

const BUFFER_TIME = 60 * 1000; // 60s

export const enum AUTH_SERVICE_KEY {
    ACCESS_TOKEN = 'ACCESS_TOKEN',
    REFRESH_TOKEN = 'REFRESH_TOKEN',
    USER = 'USER',
    LANGUAGE = 'LANGUAGE',
    ACCESS_TOKEN_EXPIRED_AT = 'ACCESS_TOKEN_EXPIRED_AT',
    REFRESH_TOKEN_EXPIRED_AT = 'REFRESH_TOKEN_EXPIRED_AT',
}
class LocalStorageAuthService {
    // ACCESS_TOKEN
    setAccessToken(token: string): void {
        storage.setLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN, token);
    }
    getAccessToken(): string {
        return storage.getLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN);
    }
    resetAccessToken(): void {
        storage.setLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN, '');
    }
    // ACCESS_TOKEN_EXPIRED_AT
    getAccessTokenExpiredAt(): number {
        return +storage.getLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN_EXPIRED_AT);
    }
    setAccessTokenExpiredAt(expiredIn: number): void {
        const expiredAt = new Date().getTime() + expiredIn * 1000 - BUFFER_TIME;
        storage.setLocalStorage(
            AUTH_SERVICE_KEY.ACCESS_TOKEN_EXPIRED_AT,
            String(expiredAt),
        );
    }
    resetAccessTokenExpiredAt(): void {
        storage.setLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN_EXPIRED_AT, '');
    }
    // REFRESH_TOKEN
    setRefreshToken(token: string): void {
        storage.setLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN, token);
    }
    getRefreshToken(): string {
        return storage.getLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN);
    }
    resetRefreshToken(): void {
        storage.setLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN, '');
    }
    // REFRESH_TOKEN_EXPIRED_AT
    setRefreshTokenExpiredAt(expiredIn: number): void {
        const expiredAt = new Date().getTime() + expiredIn * 1000 - BUFFER_TIME;
        storage.setLocalStorage(
            AUTH_SERVICE_KEY.REFRESH_TOKEN_EXPIRED_AT,
            String(expiredAt),
        );
    }
    getRefreshTokenExpiredAt(): number {
        return +storage.getLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN_EXPIRED_AT);
    }
    resetRefreshTokenExpiredAt(): void {
        storage.setLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN_EXPIRED_AT, '');
    }
    // LANGUAGE
    setLanguage(value: SupportLanguage): void {
        storage.setLocalStorage(AUTH_SERVICE_KEY.LANGUAGE, value);
    }
    getLanguage(): SupportLanguage {
        return (storage.getLocalStorage(AUTH_SERVICE_KEY.LANGUAGE) ||
            DEFAULT_LANGUAGE) as SupportLanguage;
    }

    // LOGIN USER
    setLoginUser(user: null | IUser): void {
        if (!user) {
            storage.setLocalStorage(AUTH_SERVICE_KEY.USER, '');
        }
        else {
            storage.setLocalStorage(AUTH_SERVICE_KEY.USER, JSON.stringify(user));
        }
    }
    getLoginUser(): IUser {
        return storage.getObjectFromKey(AUTH_SERVICE_KEY.USER) as IUser;
    }

    getHeader() {
        return {
            Authorization: `Bearer ${this.getAccessToken()}`,
            'Accept-Language': this.getLanguage() || DEFAULT_LANGUAGE,
        };
    }

    resetAll(): void {
        this.resetAccessToken();
        this.resetAccessTokenExpiredAt();
        this.resetRefreshToken();
        this.resetRefreshTokenExpiredAt();
        this.setLoginUser(null);
    }
}

const localStorageAuthService = new LocalStorageAuthService();
export default localStorageAuthService;
