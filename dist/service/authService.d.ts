import { User } from '../dto/User';
declare class authService {
    registration(email: string, password: string): Promise<{
        user: User;
        accessToken: string;
        refreshToken: string;
    }>;
    login(email: string, password: string): Promise<{
        user: User;
        accessToken: string;
        refreshToken: string;
    }>;
    logout(user_id: string): Promise<import(".prisma/client").refresh_token>;
    refresh(refreshToken: string): Promise<{
        user: User;
        accessToken: string;
        refreshToken: string;
    }>;
}
declare const _default: authService;
export default _default;
