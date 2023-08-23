import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthGoogleService } from './services/auth.google.service';
import { AuthLoginService } from './services/auth.login.service';

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [JwtService, AuthGoogleService, AuthLoginService],
})
export class AuthModule {
    //
}
