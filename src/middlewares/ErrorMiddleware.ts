import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/HttpError"; // Adjust path as needed
// import logger from "utils/Logger";
const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  let status = 500;
  let message = "Internal Server Error";
  let details;

  if (err instanceof HttpError) {
    status = err.status;
    message = err.message;
    details = err.details;
  } else if (err instanceof SyntaxError && "body" in err) {
    status = 400;
    message = "Invalid JSON payload";
  } else if (err instanceof Error) {
    message = err.message;
  }
  //Log the error
  // logger.error(`${req.method} ${req.url} - ${err.message}`, { stack: err.stack });
  res.status(status).json({
    success: false,
    error: message,
    details,
  });
};

export default errorHandler;
