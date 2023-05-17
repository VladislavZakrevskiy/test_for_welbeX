"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
function ErrorMiddleware(err, req, res, next) {
    if (err.status) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    else {
        console.log(err);
        return res.status(500).json({ message: 'Server Error' });
    }
}
exports.ErrorMiddleware = ErrorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map