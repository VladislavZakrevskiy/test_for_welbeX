"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var prisma_1 = __importDefault(require("../prisma"));
var tokenService = (function () {
    function tokenService() {
    }
    tokenService.prototype.generateTokens = function (payload) {
        var accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '30m'
        });
        var refreshToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '30d'
        });
        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        };
    };
    tokenService.prototype.saveToken = function (user_id, refresh) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenDate, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, prisma_1.default.refresh_token.findUnique({ where: { user_id: user_id } })];
                    case 1:
                        tokenDate = _a.sent();
                        if (!tokenDate) return [3, 3];
                        return [4, prisma_1.default.refresh_token.update({ data: { token: refresh, user_id: user_id }, where: { user_id: user_id } })];
                    case 2:
                        _a.sent();
                        return [2];
                    case 3: return [4, prisma_1.default.refresh_token.create({ data: { token: refresh, user_id: user_id } })];
                    case 4:
                        token = _a.sent();
                        return [2, token];
                }
            });
        });
    };
    tokenService.prototype.remove = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, prisma_1.default.refresh_token.delete({ where: { user_id: user_id } })];
                    case 1:
                        tokenData = _a.sent();
                        return [2, tokenData];
                }
            });
        });
    };
    tokenService.prototype.find = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, prisma_1.default.refresh_token.findFirst({ where: { token: refreshToken } })];
                    case 1:
                        tokenData = _a.sent();
                        return [2, tokenData];
                }
            });
        });
    };
    tokenService.prototype.validateAccessToken = function (accessToken) {
        try {
            var userData = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_ACCESS_SECRET);
            return userData;
        }
        catch (error) {
            return null;
        }
    };
    tokenService.prototype.validateRefreshToken = function (refreshToken) {
        try {
            var userData = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            return userData;
        }
        catch (error) {
            return null;
        }
    };
    return tokenService;
}());
exports.default = new tokenService();
//# sourceMappingURL=tokenService.js.map