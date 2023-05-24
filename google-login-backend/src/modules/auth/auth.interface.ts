
export interface IGoogleLoginBody {
    token?: string;
    redirectUri?: string;
}
export interface IGoogleLoginLinkQuery {
    redirectUri: string;
}

export interface IGoogleData {
    id: string;
    email: string;
    name: string;
    givenName: string;
    familyName: string;
    picture: string;
}
