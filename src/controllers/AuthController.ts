import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/AuthService';
import { LoginRequest } from "types";
import { successResponse, errorResponse, paginatedResponse } from "../utils/Responses";
const authService = new AuthService();

export default class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await authService.register(req.body, req.file);
            res.status(201).json(successResponse("Success", user));
        } catch (error: unknown) {
            next(error)
        }
    }

    async verifyEmailHandler(req: Request, res: Response, next: NextFunction) {
      try {
        const { token } = req.query;
        const response = await authService.verifyEmail(token as string);
        res.status(200).json(successResponse(response?.message));
      } catch (error: unknown) {
        next(error)
      }
    };
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, otp }: LoginRequest = req.body;
            const userAgent = req.headers["user-agent"] || "";
            const ipAddress = req.ip || "Unknown";
            const { user, token } = await authService.login(email, password || "", otp || "", userAgent, ipAddress);
            const { password: userpass, ...rest } = user.dataValues;
            res.status(200).json(successResponse("Loggin successful", { user: { ...rest }, token }));
        } catch (error: unknown) {
          next(error) 
        }
    }

    async sendOtp(req: Request, res: Response, next: NextFunction) {
      try {
        const { email } = req.body;
        await authService.sendOtp(email)
        
        return res.json(successResponse("OTP sent successfully!"));
        } catch (error: unknown) {
        next(error) 
      }
    }
}