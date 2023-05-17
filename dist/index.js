"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var authRoutes_1 = __importDefault(require("./routes/authRoutes"));
var postRoutes_1 = __importDefault(require("./routes/postRoutes"));
var errorMiddleware_1 = require("./middlewares/errorMiddleware");
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use((0, express_fileupload_1.default)());
app.use(express_1.default.static(path_1.default.resolve(__dirname, 'files')));
app.use('/auth', authRoutes_1.default);
app.use('/posts', postRoutes_1.default);
app.use(errorMiddleware_1.ErrorMiddleware);
app.listen(port, function () {
    console.log("[server]: Server is running at http://localhost:".concat(port));
});
//# sourceMappingURL=index.js.map