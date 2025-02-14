import { Request, Response, NextFunction } from "express";
import User from "../database/models/User";
import Role from "../database/models/Role";
import Permission from "../database/models/Permission";
import { AuthenticatedRequest } from "types";

const checkPermission = (permissionName: string) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id; // Assuming the user is stored in `req.user`
      if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      // Fetch user's roles and permissions
      const user = await User.findByPk(userId, {
        include: {
          model: Role,
          include: [{
            model: Permission,
            where: { name: permissionName },
            required: false,
          }],
        },
      });

      if (!user || !user.roles || user.roles.length === 0) {
        return res.status(403).json({ success: false, message: "Forbidden" });
      }

      // Check if the user has an "admin" role (allow all actions)
      const isAdmin = user.Roles.some((role) => role.name.toLowerCase() === "admin");
      if (isAdmin) {
        return next(); // Skip permission checks for admins
      }

      // Check if the user has the required permission
      const hasPermission = user.Roles.some((role) =>
        role.Permissions.some((perm) => perm.name === permissionName)
      );

      if (!hasPermission) {
        return res.status(403).json({ success: false, message: "Forbidden" });
      }

      next();
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error" });
    }
  };
};

export default checkPermission;