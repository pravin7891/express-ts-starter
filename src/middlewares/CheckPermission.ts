import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "types";
import RbacService from "../services/RbacService";
import { errorResponse } from "../utils/Responses";
import BaseRepository from "../repositories/BaseRepository"; // Generic repository
import { Model, ModelStatic } from "sequelize";
import { HttpError } from "../utils/HttpError";

//, entityModel?: typeof Model, entityField = "userId"
const checkPermission = <T extends Model>(
    permissionName: string, 
    entityModel?: ModelStatic<T>, 
    entityField: keyof T = "userId" as keyof T) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id; // Assuming the user is stored in `req.user`

      if (!userId) {
        throw new HttpError(401, `user not available`);
      }

      // Fetch user's roles and permissions
      const userRoles = await RbacService.getUserRoles(userId)
      console.log("CheckPermission: ", userRoles )
      if (userRoles.length === 0) {
        throw new HttpError(401, `no suffient user access`);
      }

      // Check if the user has an "admin" role (allow all actions)
      const isAdmin = userRoles.some((userrole: any) => userrole.name.toLowerCase() === "admin");
      if (isAdmin) {
        return next(); // Skip permission checks for admins
      }
      
      const roleIds = userRoles.map(ur => ur.id);
      const userPermissions = await RbacService.getUserPermissions(roleIds);
      console.log("USR ROLES: ", userRoles, userPermissions);


      // Check if the user has the required permission
      const hasPermission = userPermissions.some((perm) => perm === permissionName);
      if (hasPermission) {
        return next()
      }
      //
      if (entityModel) {
        const entityId = req.params.id;
        if (!entityId) {
          throw new HttpError(400, `Entity ID is required`);
        }

        //Check if Manage permission on entity
      // Extract entity name from permission string (e.g., "update_post" -> "post")
      const [, entityName] = permissionName.split("."); // Get second part after "_"

      // Extract entity name from the model dynamically
      let modelName = entityModel?.name;
      modelName = modelName?.toLowerCase(); // Normalize case

      // If model name doesn't match permission entity name, return 403
      if (entityModel && modelName !== entityName) {
        throw new HttpError(400, `Invalid entity for permission: Expected '${modelName}' but got '${entityName}'`);
        // return res.status(400).json({ message: `Invalid entity for permission: Expected '${modelName}' but got '${entityName}'` });
      }
      // If user has `manage_{entityName}`, allow all actions on this entity
      if (userPermissions.includes(`manage_${entityName}`)) {
        return next();
      }
        // Fetch the entity dynamically using the BaseRepository
        const entity = await new BaseRepository(entityModel).findById(entityId as unknown as number);
        // const entity = await entityModel.findByPk(entityId);
        if (!entity) {
          throw new HttpError(404, "Resource not found");
        }
        // Check if the user owns the entity
        if (entity[entityField] === userId) {
          const ownPermission = permissionName.replace(".any.", ".own.");
          if (userPermissions.includes(ownPermission)) {
            return next();
          }
        }
    }

      return res.status(401).json(errorResponse("You dont have permission to perform this task"));
    } catch (error) {
      return next(error);
    }
  };
};

export default checkPermission;