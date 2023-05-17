import { IUser } from "../dto/User";
import jwt from 'jsonwebtoken';
declare class tokenService {
    generateTokens(payload: IUser): {
        accessToken: string;
        refreshToken: string;
    };
    saveToken(user_id: string, refresh: string): Promise<import(".prisma/client").refresh_token>;
    remove(user_id: string): Promise<import(".prisma/client").refresh_token>;
    find(refreshToken: string): Promise<import(".prisma/client").refresh_token>;
    validateAccessToken(accessToken: string): string | jwt.JwtPayload;
    validateRefreshToken(refreshToken: string): IUser | null;
}
declare const _default: tokenService;
export default _default;
