import ConfigKey from '@/common/config/config-key';
import jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createWinstonLogger } from '../../../common/services/winston.service';
import { MODULE_NAME } from '../auth.constant';
import { AuthGoogleService } from './auth.google.service';
import { I18nService } from 'nestjs-i18n';

interface IAuthenicateResult {
    success: boolean;
    errorMessage?: string;
    user?: {
        email: string;
    };
}

@Injectable()
export class AuthLoginService {
    constructor(
        private readonly configService: ConfigService,
        private readonly authGoogleService: AuthGoogleService,
        private readonly i18n: I18nService,
    ) {}
    private readonly logger = createWinstonLogger(
        MODULE_NAME,
        this.configService,
    );

    async authenticateByGoogle(
        token: string,
        redirectUri: string,
    ): Promise<IAuthenicateResult> {
        try {
            const verifyResult = await this.authGoogleService.verifyGoogleToken(
                token,
                redirectUri,
            );
            if (!verifyResult?.success) {
                return {
                    success: false,
                    errorMessage: verifyResult.errorMessage,
                };
            }

            return {
                success: true,
                user: verifyResult.googleData,
            };
        } catch (error) {
            this.logger.error('Error in authenticateByGoogle: ', error);
            return {
                success: false,
                errorMessage: this.i18n.t('error.invalidLoginInfo'),
            };
        }
    }

    generateAccessToken(email: string) {
        const accessTokenExpiredIn = this.configService.get(
            ConfigKey.JWT_ACCESS_TOKEN_EXPIRED_IN,
        );

        const tokenPrivateKey = this.configService
            .get(ConfigKey.JWT_ACCESS_TOKEN_SECRET_KEY)
            .replace(/\\n/g, '\n');
        const payloadToken = {
            email,
            expiresIn: accessTokenExpiredIn,
        };
        const accessToken = jwt.sign(payloadToken, tokenPrivateKey, {
            expiresIn: accessTokenExpiredIn,
        });
        return {
            token: accessToken,
            expiresIn: accessTokenExpiredIn,
        };
    }

    generateRefreshToken(email: string) {
        const refreshTokenExpiredIn = this.configService.get(
            ConfigKey.JWT_REFRESH_TOKEN_EXPIRED_IN,
        );
        const tokenPrivateKey = this.configService
            .get(ConfigKey.JWT_REFRESH_TOKEN_SECRET_KEY)
            .replace(/\\n/g, '\n');

        const payloadToken = {
            email,
            expiresIn: refreshTokenExpiredIn,
        };
        const refreshToken = jwt.sign(payloadToken, tokenPrivateKey, {
            expiresIn: refreshTokenExpiredIn,
        });
        return {
            token: refreshToken,
            expiresIn: refreshTokenExpiredIn,
        };
    }
}
