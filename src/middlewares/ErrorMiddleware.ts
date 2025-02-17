import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/HttpError"; // Adjust path as needed
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  let status = 500;
  let message = "Internal Server Error";
  let details;

  if (err instanceof TokenExpiredError) {
    status = 401;
    message = "Session expired. Please log in again.";
  } else if (err instanceof JsonWebTokenError) {
    status = 401;
    message = "Invalid token. Authentication failed.";
  } else if (err instanceof HttpError) {
    status = err.status;
    message = err.message;
    details = err.details;
  } else if (err instanceof SyntaxError && "body" in err) {
    status = 400;
    message = "Invalid JSON payload";
  } else if (err instanceof Error) {
    message = err.message;
  }

  // As we already logged the error using errorLogger middleware
  res.status(status).json({
    success: false,
    error: message,
    details,
  });
};

export default errorHandler;
