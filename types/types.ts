export interface UserInfo {
    name?: string,
    email?: string,
    slug?: string,
    description?: string,
    image?: any,
    cover?: any;
    password?: string;
}

export enum CurrentPage {
    LOGIN = 'login',
    REGISTER = 'register',
}

export interface AuthResponse {
    value: string
}

export interface Footer {
    currentPage: CurrentPage;
}

export interface EmptyAvatar {
    name?: string;
    width?: number;
    height?: number;
}
