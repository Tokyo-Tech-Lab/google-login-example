export const MODULE_NAME = 'auth';

export const GoogleLoginLinkParameters = {
    scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
    ], // refer to https://developers.google.com/identity/protocols/oauth2/scopes
    responseType: 'code',
    accessType: 'offline',
    prompt: 'consent',
    prefixUrl: 'https://accounts.google.com/o/oauth2/v2/auth?',
};
export const GoogleUserInfoUrl =
    'https://www.googleapis.com/oauth2/v1/userinfo';
export const GoogleGetAccessTokenUrl = 'https://oauth2.googleapis.com/token';


