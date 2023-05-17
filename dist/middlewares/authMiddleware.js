"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
var tokenService_1 = __importDefault(require("../service/tokenService"));
var ApiError_1 = require("../exceptions/ApiError");
function AuthMiddleware(req, res, next) {
    try {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            throw ApiError_1.ApiError.UnauthorizedError();
        }
        var accessToken = authHeader.split(' ')[1];
        if (!accessToken) {
            throw ApiError_1.ApiError.UnauthorizedError();
        }
        var userData = tokenService_1.default.validateAccessToken(accessToken);
        if (!userData) {
            throw ApiError_1.ApiError.UnauthorizedError();
        }
        req.user = userData;
        next();
    }
    catch (e) {
        return next(ApiError_1.ApiError.UnauthorizedError());
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=authMiddleware.js.map