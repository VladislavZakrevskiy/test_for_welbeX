export declare class ApiError extends Error {
    status: any;
    errors: any;
    constructor(status: number, message: any, errors?: any);
    static UnauthorizedError(): ApiError;
    static badRequest(message: any, errors: string[]): ApiError;
}
