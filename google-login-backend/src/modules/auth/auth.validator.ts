import {
    TEXTAREA_MAX_LENGTH,
} from 'src/common/constants';

import Joi from 'src/plugins/joi';
import { AuthProvider } from './auth.constant';

export const getGoogleLoginUrlQuerySchema = Joi.object().keys({
    redirectUri: Joi.string().max(TEXTAREA_MAX_LENGTH).uri().required(),
});

export const googleLoginBodySchema = Joi.object().keys({
    token: Joi.when('provider', {
        is: Joi.valid(AuthProvider.GOOGLE),
        then: Joi.string().required(),
        otherwise: Joi.forbidden(),
    }),
    redirectUri: Joi.string().max(TEXTAREA_MAX_LENGTH).uri().required(),
});

