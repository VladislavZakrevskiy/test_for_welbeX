"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var express_1 = __importDefault(require("express"));
var authController_1 = __importDefault(require("../controllers/authController"));
var router = express_1.default.Router();
router.post('/registration', (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isLength({ min: 3, max: 32 }), authController_1.default.registration);
router.post('/login', authController_1.default.login);
router.post('/logout', authController_1.default.logout);
router.get('/refresh', authController_1.default.refresh);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map