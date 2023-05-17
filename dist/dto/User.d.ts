export interface IUser {
    email: string;
    password: string;
    user_id?: string;
}
export declare class User {
    email: string;
    password: string;
    user_id?: string;
    constructor(model: IUser);
}
