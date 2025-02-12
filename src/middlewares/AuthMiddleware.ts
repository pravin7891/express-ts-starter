import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { decode } from "punycode";
import LoginHistoryRepository from "../repositories/LoginHistoryRepository";
import { AuthUser, JwtPayload } from "types";


  
export default class AuthMiddleware {
    static async verifyToken(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(403).json({ error: 'No token provided' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')  as JwtPayload;
            if (typeof decoded !== "object" || !decoded) {
                return res.status(401).json({ message: "Invalid token" });
              }
            const loginSession = await LoginHistoryRepository.findOne({ 
                where: { id: decoded.loginHistoryId, isActive: true } 
              });
            if (!loginSession) {
            return res.status(401).json({ message: "Session expired or logged out" });
            }
            
            req.user = { 
                id: decoded.id, 
                loginHistoryId: decoded.loginHistoryId, 
                email: decoded.email, 
                role: decoded.role 
            } as AuthUser;
            if(!req.user){
                return res.status(401).json({ error: 'Unauthorized' });
            }
            return next();
        } catch (error) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }
}