import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';
import { AuthenticatedRequest } from "types";
import { errorResponse, paginatedResponse, successResponse } from "../utils/Responses";
import { parseQueryParams } from "../utils/Helpers";
import RbacService from "../services/RbacService";

export default class RbacController {
    async getRoles(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
          
            const queryParams = parseQueryParams(req.params);

            const { data, total, limit, page } = await RbacService.getRoles(queryParams)
            res.status(200).json(paginatedResponse("roles retrieved", data, page, limit, total));

        } catch (error: any) {
            next(error); 
        }
    }
    async getPermissions(req: AuthenticatedRequest, res: Response, next: NextFunction) {
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

}