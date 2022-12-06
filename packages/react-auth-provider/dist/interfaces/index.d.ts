export interface LoginParams {
    username: string;
    password: string;
}
export declare type AuthProviderTypes = {
    user: unknown;
    doLogin: (loginData: LoginParams) => void;
    doLogout: () => void;
    isFetching: unknown;
};
