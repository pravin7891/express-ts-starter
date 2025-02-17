import { Response, NextFunction } from "express";
import RbacService from "services/RbacService";
import { AuthenticatedRequest } from "types";
import { HttpError } from "utils/HttpError";
import { errorResponse } from "utils/Responses";
const roleHierarchy = ['user', 'editor', 'moderator', 'admin'];
const checkRole = (requiredRoles: string[]) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const userId = req.user!.id; // assuming the user can have multiple roles
        // Fetch user's roles and permissions
        const userRoles = await RbacService.getUserRoles(userId)
        try {
            console.log("CheckPermission: ", userRoles )
            if (userRoles.length === 0) {
              throw new HttpError(401, `no suffient user access`);
            }
            const isAllowed = requiredRoles.some(role => {
                const requiredRoleIndex = roleHierarchy.indexOf(role);
                return userRoles.some(userRole => roleHierarchy.indexOf(userRole.name.toLowerCase()) >= requiredRoleIndex);
              });
          
              if (isAllowed) {
                //req.skipPermissionCheck=true to skip ermission middleware
                // handle this in CheckPermission.ts as well
                next();
              }
              return res.status(403).json(errorResponse("Forbidden: Insufficeint roles"));
        } catch (error) {
            return next(error)
        }     
    };
  }

  export default checkRole;  