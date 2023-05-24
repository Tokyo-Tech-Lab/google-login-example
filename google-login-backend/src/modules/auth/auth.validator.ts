import { TEXTAREA_MAX_LENGTH } from 'src/common/constants';

import Joi from 'src/plugins/joi';

export const getGoogleLoginUrlQuerySchema = Joi.object().keys({
    redirectUri: Joi.string().max(TEXTAREA_MAX_LENGTH).uri().required(),
});

export const googleLoginBodySchema = Joi.object().keys({
    token: Joi.string().required(),
    redirectUri: Joi.string().max(TEXTAREA_MAX_LENGTH).uri().required(),
});

