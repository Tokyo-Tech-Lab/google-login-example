export enum PageName {
    LOGIN_PAGE = 'LoginPage',
    PROFILE_PAGE = 'ProfilePage',
    DASHBOARD_PAGE = 'DashboardPage',
    NOT_FOUND_PAGE = 'NotFoundPage',
    GOOGLE_LOGIN_PAGE = 'GoogleLoginPage',
}

export enum SupportLanguage {
    EN = 'en',
    VI = 'vi',
}

export const DEFAULT_LANGUAGE = SupportLanguage.VI;

export enum HttpStatus {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,
    NETWORK_ERROR = 447,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
}

