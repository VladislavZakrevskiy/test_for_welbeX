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
var postService_1 = __importDefault(require("../service/postService"));
var fileService_1 = __importDefault(require("../service/fileService"));
var postsController = (function () {
    function postsController() {
    }
    postsController.prototype.getPost = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var post_id, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        post_id = req.params.post_id;
                        return [4, postService_1.default.getPost(post_id)];
                    case 1:
                        response = _a.sent();
                        res.json(response);
                        return [3, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        next(e_1);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    postsController.prototype.getPostsUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, limit, page, id, response, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, limit = _a.limit, page = _a.page, id = _a.id;
                        return [4, postService_1.default.getPostsUser(id, limit, page)];
                    case 1:
                        response = _b.sent();
                        res.json(response);
                        return [3, 3];
                    case 2:
                        e_2 = _b.sent();
                        console.log(e_2);
                        next(e_2);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    postsController.prototype.createPost = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, body, id, files, fileNames, response, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, body = _a.body, id = _a.id;
                        files = req.files;
                        fileNames = fileService_1.default.upload(files);
                        return [4, postService_1.default.createPost(body, id, fileNames)];
                    case 1:
                        response = _b.sent();
                        res.json(response);
                        return [3, 3];
                    case 2:
                        e_3 = _b.sent();
                        console.log(e_3);
                        next(e_3);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    postsController.prototype.getPosts = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, limit, page, response, e_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, limit = _a.limit, page = _a.page;
                        return [4, postService_1.default.getPosts(limit, page)];
                    case 1:
                        response = _b.sent();
                        res.json(response);
                        return [3, 3];
                    case 2:
                        e_4 = _b.sent();
                        console.log(e_4);
                        next(e_4);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    postsController.prototype.update = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, message, id, response, e_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, message = _a.message, id = _a.id;
                        return [4, postService_1.default.updatePost(message, id)];
                    case 1:
                        response = _b.sent();
                        res.json(response);
                        return [3, 3];
                    case 2:
                        e_5 = _b.sent();
                        console.log(e_5);
                        next(e_5);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    postsController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var post_id, response, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        post_id = req.body.post_id;
                        return [4, postService_1.default.delete(post_id)];
                    case 1:
                        response = _a.sent();
                        res.json(response);
                        return [3, 3];
                    case 2:
                        e_6 = _a.sent();
                        console.log(e_6);
                        next(e_6);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    return postsController;
}());
exports.default = new postsController();
//# sourceMappingURL=postController.js.map