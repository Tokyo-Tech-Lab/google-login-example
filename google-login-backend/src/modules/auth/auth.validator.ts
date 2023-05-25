import Joi from 'src/plugins/joi';

export const getGoogleLoginUrlQuerySchema = Joi.object().keys({
    redirectUri: Joi.string().uri().required(),
});

export const googleLoginBodySchema = Joi.object().keys({
    token: Joi.string().required(),
    redirectUri: Joi.string().uri().required(),
});

