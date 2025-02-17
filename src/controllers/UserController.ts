import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';
import { AuthenticatedRequest } from "types";
import { HttpError } from "../utils/HttpError";
import { errorResponse, successResponse } from "../utils/Responses";

export default class UserController {
    async updateProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const { name, email } = req.body;
            const userId = req.user!.id; // Extracted from JWT middleware
            const file = req.file;

            const user = await UserService.updateProfile(userId, name, email, file);
            res.json(user);
        } catch (error: any) {
            next(error); 
        }
    }
    async getMyProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id; // Extracted from JWT middleware

            const user = await UserService.getProfile(userId);
            if (!user) {
              res.status(404).json(successResponse("user not found"));
            }
            const { password, ...rest} = user.dataValues;

            res.status(200).json(successResponse("profile retrieved", { ...rest }));
        } catch (error: any) {
            next(error); 
        }
    }
    async getUserProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.userId, 10); // Extracted from JWT middleware
            if (isNaN(userId)) {
              return res.status(400).json(errorResponse("Invalid request"));
            }
            const user = await UserService.getProfile(userId);
            if (!user) {
              res.status(404).json(successResponse("user not found"));
            }
            const { password, ...rest} = user.dataValues;
    
            res.status(200).json(successResponse("profile retrieved", { ...rest }));
        } catch (error: any) {
            next(error); 
        }
    }


    updatePassword = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
          const userId = req.user!.id;
          const { currentPassword, newPassword } = req.body;
      
          await UserService.updatePassword(userId, currentPassword, newPassword);
      
          return res.json({ message: 'Password updated successfully' });
        } catch (error: any) {
          next(error)
        }
    }
    async updateProfilePicture(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
          const { id: userId } = req.user!;
          const file = req.file;
    
          if (!file) return res.status(400).json({ error: 'No file uploaded' });
    
          const updatedUser = await UserService.updateProfilePicture(userId, file);
    
          return res.json({ message: 'Profile picture updated', user: updatedUser });
        } catch (error: any) {
            next(error)
        }
      }
}