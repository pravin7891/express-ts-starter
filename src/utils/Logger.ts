import winston from "winston";
import path from "path";
import { Request, Response, NextFunction } from "express";

const logFormat = winston.format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message} ${stack ? "\n" + stack : ""}`;
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat),
      silent: process.env.NODE_ENV === "production",
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/error.log"),
      level: "error",
      silent: process.env.NODE_ENV !== "production",
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/combined.log"),
      silent: process.env.NODE_ENV !== "production",
    }),
  ],
});

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url} from ${req.ip}`);
  console.log("Req.body: ", req.body);
  next();
};

export const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`${req.method} ${req.url} - ${err.message}`, { stack: err.stack });
  next(err);
};

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception: " + err.message, { stack: err.stack });
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection: " + (reason as Error).message, { stack: (reason as Error).stack });
});

export default logger;