export declare class AuthService {
    private user;
    private userName;
    login(userName: string, password: string): Promise<Object | undefined>;
    getUserName(): string;
}
