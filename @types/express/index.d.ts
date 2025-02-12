import * as express from "express";
import { AuthUser } from "../../src/types";

declare global {
  namespace Express {
    interface Request {
      file?: Multer.File;
      files?: Multer.File[];
      user?: AuthUser;
    }
  }
}