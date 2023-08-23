import { HttpStatus } from '@/common/constants';
import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Post,
    Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { ErrorResponse, SuccessResponse } from 'src/common/helpers/response';
import { JoiValidationPipe } from 'src/common/pipe/joi.validation.pipe';
import { IGoogleLoginBody } from './auth.interface';
import {
    getGoogleLoginUrlQuerySchema,
    googleLoginBodySchema,
} from './auth.validator';
import { AuthGoogleService } from './services/auth.google.service';
import { AuthLoginService } from './services/auth.login.service';

@Controller('/auth')
export class AuthController {
    constructor(
        private readonly i18n: I18nService,
        private readonly configService: ConfigService,
        private readonly authGoogleService: AuthGoogleService,
        private readonly loginService: AuthLoginService,
        private readonly jwtService: JwtService,
    ) {
        //
    }

    @Get('/google-login-url')
    async requestSocialLoginUrl(
        @Query(new JoiValidationPipe(getGoogleLoginUrlQuerySchema)) query,
    ) {
        try {
            const loginUrl = this.authGoogleService.getGoogleLoginUrl(query);

            if (!loginUrl) {
                return new ErrorResponse(
                    HttpStatus.UNAUTHORIZED,
                    this.i18n.t('auth.error.invalidLoginInfo'),
                    [],
                );
            }
            return new SuccessResponse({ loginUrl });
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    @Post('google-login')
    async login(
        @Body(new JoiValidationPipe(googleLoginBodySchema))
        body: IGoogleLoginBody,
    ) {
        try {
            const authenticateResult =
                await this.loginService.authenticateByGoogle(
                    body.token,
                    body.redirectUri,
                );
            if (!authenticateResult.success) {
                return new ErrorResponse(
                    HttpStatus.UNAUTHORIZED,
                    authenticateResult.errorMessage,
                    [],
                );
            }
            const accessToken = this.loginService.generateAccessToken(
                authenticateResult.user?.email,
            );
            const refreshToken = this.loginService.generateRefreshToken(
                authenticateResult.user?.email,
            );
            return new SuccessResponse({
                profile: authenticateResult.user,
                accessToken,
                refreshToken,
            });
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }
}
