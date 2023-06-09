import {
    Catch,
    ArgumentsHost,
    HttpException,
    Inject,
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { Logger } from 'winston';
import { I18nService } from 'nestjs-i18n';
import { BaseExceptionFilter } from '@nestjs/core';
import { uniqueId } from 'lodash';
import { ValidationErrorItem } from 'joi';
import { HttpStatus } from './constants';

const translateErrorValidator = async (
    errors: ValidationErrorItem[],
    i18n: I18nService,
) => {
    const errorMessages = await Promise.all(
        errors.map(async (error: ValidationErrorItem) => {
            const { type, context, path } = error;
            const key = ['validation', type].join('.');
            // translate label
            context.label = await i18n.translate(context.label);

            // translate message
            let message = '';
            if (context.name) {
                message = await i18n.translate(context.name, { args: context });
            } else {
                message = await i18n.translate(key, { args: context });
            }
            return {
                key: path.join('.'),
                errorCode: HttpStatus.BAD_REQUEST,
                message,
            };
        }),
    );

    return errorMessages;
};

const handleBadRequestException = async (
    exception: BadRequestException,
    i18n: I18nService,
) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = exception.getResponse() as any;
    let errors = [];

    if (Array.isArray(response.errors) && response?.errors.length > 0) {
        errors = await translateErrorValidator(response.errors, i18n);
    }
    return {
        code: HttpStatus.BAD_REQUEST,
        message: exception.message,
        errors,
    };
};

const handleInternalErrorException = async (
    exception: InternalServerErrorException,
    request: Request,
    logger: Logger,
    i18n: I18nService,
) => {
    const logId = `${Date.now()}${uniqueId()}`;
    const message = `System error with id = ${logId}: ${exception.message}`;
    // write detail log to trace bug
    logger.error(message, {
        requestUrl: request.url,
        request: request.body,
        exception,
    });
    // return only logId
    return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: await i18n.translate('errors.500', {
            lang: request?.headers['accept-language'],
            args: { param: logId },
        }),
        errors: [],
    };
};

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter {
    constructor(
        @Inject('winston') private readonly logger: Logger,
        private readonly i18n: I18nService,
        private readonly configService: ConfigService,
    ) {
        super();
    }
    async catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const apiResponse = exception.getResponse() as any;
        const status = exception.getStatus();
        let parsedResponse = {
            code: exception.getStatus(),
            message: await this.i18n.translate(`errors.${status}`, {
                lang: request?.headers['accept-language'],
            }),
            errors: apiResponse?.errors || [],
        };
        this.logger.error(apiResponse.message, {
            requestUrl: request.url,
            request: request.body,
            exception,
        });
        if (exception instanceof InternalServerErrorException) {
            parsedResponse = await handleInternalErrorException(
                exception,
                request,
                this.logger,
                this.i18n,
            );
        } else if (exception instanceof BadRequestException) {
            parsedResponse = await handleBadRequestException(
                exception,
                this.i18n,
            );
        }
        return response.status(status).json(parsedResponse);
    }
}
