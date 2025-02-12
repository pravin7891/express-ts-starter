import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';
import { AuthenticatedRequest } from "types";
import { HttpError } from "../utils/HttpError";

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