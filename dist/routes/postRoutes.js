"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var authMiddleware_1 = require("../middlewares/authMiddleware");
var postController_1 = __importDefault(require("../controllers/postController"));
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get('/:post_id', authMiddleware_1.AuthMiddleware, postController_1.default.getPost);
router.get('/user', authMiddleware_1.AuthMiddleware, postController_1.default.getPostsUser);
router.get('/all', authMiddleware_1.AuthMiddleware, postController_1.default.getPosts);
router.post('/', authMiddleware_1.AuthMiddleware, postController_1.default.createPost);
router.patch('/', authMiddleware_1.AuthMiddleware, postController_1.default.update);
router.delete('/', authMiddleware_1.AuthMiddleware, postController_1.default.delete);
exports.default = router;
//# sourceMappingURL=postRoutes.js.map