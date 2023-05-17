"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var prisma_1 = __importDefault(require("../prisma"));
var bcrypt = __importStar(require("bcrypt"));
var tokenService_1 = __importDefault(require("./tokenService"));
var User_1 = require("../dto/User");
var ApiError_1 = require("../exceptions/ApiError");
var authService = (function () {
    function authService() {
    }
    authService.prototype.registration = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var candidate, hashPassword, user, userDto, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, prisma_1.default.user.findUnique({ where: { email: email } })];
                    case 1:
                        candidate = _a.sent();
                        if (!!candidate) return [3, 5];
                        return [4, bcrypt.hash(password, 7)];
                    case 2:
                        hashPassword = _a.sent();
                        return [4, prisma_1.default.user.create({ data: { email: email, password: hashPassword } })];
                    case 3:
                        user = _a.sent();
                        userDto = new User_1.User(user);
                        tokens = tokenService_1.default.generateTokens(__assign({}, userDto));
                        return [4, tokenService_1.default.saveToken(userDto.user_id, tokens.refreshToken)];
                    case 4:
                        _a.sent();
                        return [2, __assign(__assign({}, tokens), { user: userDto })];
                    case 5: throw ApiError_1.ApiError.badRequest("\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0441 \u043F\u043E\u0447\u0442\u043E\u0432\u044B\u043C \u0430\u0434\u0440\u0435\u0441\u043E\u043C ".concat(email, " \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"), []);
                }
            });
        });
    };
    authService.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isPassEquals, userDto, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, prisma_1.default.user.findUnique({ where: { email: email } })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw ApiError_1.ApiError.badRequest('Пользователь не был найден', ['not exist']);
                        }
                        return [4, bcrypt.compare(password, user.password)];
                    case 2:
                        isPassEquals = _a.sent();
                        if (!isPassEquals) {
                            throw ApiError_1.ApiError.badRequest('Неверный пароль', ['password']);
                        }
                        userDto = new User_1.User(user);
                        tokens = tokenService_1.default.generateTokens(__assign({}, userDto));
                        return [4, tokenService_1.default.saveToken(userDto.user_id, tokens.refreshToken)];
                    case 3:
                        _a.sent();
                        return [2, __assign(__assign({}, tokens), { user: userDto })];
                }
            });
        });
    };
    authService.prototype.logout = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, tokenService_1.default.remove(user_id)];
                    case 1:
                        token = _a.sent();
                        return [2, token];
                }
            });
        });
    };
    authService.prototype.refresh = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, tokenDB, user, userDto, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!refreshToken) {
                            throw ApiError_1.ApiError.UnauthorizedError();
                        }
                        userData = tokenService_1.default.validateRefreshToken(refreshToken);
                        return [4, tokenService_1.default.find(refreshToken)];
                    case 1:
                        tokenDB = _a.sent();
                        if (!userData || !tokenDB) {
                            throw ApiError_1.ApiError.UnauthorizedError();
                        }
                        return [4, prisma_1.default.user.findUnique({ where: { user_id: userData.user_id } })];
                    case 2:
                        user = _a.sent();
                        userDto = new User_1.User(user);
                        tokens = tokenService_1.default.generateTokens(__assign({}, userDto));
                        return [4, tokenService_1.default.saveToken(userDto.user_id, tokens.refreshToken)];
                    case 3:
                        _a.sent();
                        return [2, __assign(__assign({}, tokens), { user: userDto })];
                }
            });
        });
    };
    return authService;
}());
exports.default = new authService();
//# sourceMappingURL=authService.js.map