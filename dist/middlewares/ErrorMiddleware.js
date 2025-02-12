"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = require("../utils/HttpError"); // Adjust path as needed
const errorHandler = (err, req, res, next) => {
    let status = 500;
    let message = "Internal Server Error";
    let details;
    if (err instanceof HttpError_1.HttpError) {
        status = err.status;
        message = err.message;
        details = err.details;
    }
    else if (err instanceof SyntaxError && "body" in err) {
        status = 400;
        message = "Invalid JSON payload";
    }
    else if (err instanceof Error) {
        message = err.message;
    }
    res.status(status).json({
        success: false,
        error: message,
        details,
    });
};
exports.default = errorHandler;
