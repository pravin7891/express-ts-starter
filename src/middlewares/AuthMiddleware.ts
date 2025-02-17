import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import LoginHistoryRepository from "../repositories/LoginHistoryRepository";
import { AuthUser, JwtPayload } from "types";
import { errorResponse } from "../utils/Responses";
import { HttpError } from "../utils/HttpError";

export default class AuthMiddleware {
    static async verifyToken(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(403).json(errorResponse("No token provided"));

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')  as JwtPayload;
            if (typeof decoded !== "object" || !decoded) {
                throw new HttpError(401, "Invalid token")
              }
            const loginSession = await LoginHistoryRepository.findOne({ 
                where: { id: decoded.loginHistoryId, isActive: true } 
              });
            if (!loginSession) {
                // return res.status(401).json(errorResponse("Session expired or logged out"));
                throw new HttpError(401, "Session expired or logged out")
            }
            
            req.user = { 
                id: decoded.id, 
                loginHistoryId: decoded.loginHistoryId, 
                email: decoded.email, 
            } as AuthUser;
            if(!req.user){
                throw new HttpError(401, "Unathorized")
            }
            console.log("AUTH USER: ", req.user.id);
            return next();
        } catch (error) {            
            return next(error)
        }
    }
}