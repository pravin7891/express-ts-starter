import roleRepository from '../repositories/RoleRepository';
import permissionRepository from '../repositories/PermissionRepository';
import RoleRepository from "../repositories/RoleRepository";
import { QueryParams } from "utils/Helpers";
import PermissionRepository from "../repositories/PermissionRepository";

class RbacService {

    async hasPermission(userId: number, permission: string): Promise<boolean> {
        const roles = await roleRepository.getUserRoles(userId);
        if (!roles.length) return false;

        for (const role of roles) {
            const permissions = await permissionRepository.getRolePermissions(role.id);
            if (permissions.includes(permission)) {
                return true;
            }
        }
        
        return false;
    }

    // ✅ 1. Fetch user roles
  async getUserRoles(userId: number): Promise<any> {
    const userroles = RoleRepository.getUserRoles(userId);
    return userroles;
  }

  // ✅ 2. Fetch permissions based on roles
  async getUserPermissions(userRoles: number[]): Promise<string[]> {
    
    const rolePermissions = await PermissionRepository.getRolePermissions(userRoles)
    return rolePermissions;
  }

  // ✅ 3. Get both roles and permissions for a user
  async getUserRolesAndPermissions(userId: number) {
    const roles = await this.getUserRoles(userId);
    const roleNames = roles.map((ur: any) => ur.name);
    if (roleNames.includes("admin")) {
      return ["*"]; // Admin has all permissions
    }
    const roleIds = roles.map((ur: any) => ur.id);
    const permissions = await this.getUserPermissions(roleIds);
    return { roles, permissions };
  }

    // async getUserRolesAndPermissions(userId: number): Promise<{ roles: string[]; permissions: string[] }> {
    //     const user = await UserRepository.findById(userId, {
    //       include: [
    //         {
    //           model: Role,
    //           as: "roles", // ✅ Ensure alias matches `as: "roles"`
    //           include: [
    //             {
    //               model: Permission,
    //               as: "permissions", // ✅ Ensure alias matches `as: "permissions"`
    //               attributes: ["name"],
    //               through: { attributes: [] }, // ✅ Exclude join table fields
    //             },
    //           ],
    //         },
    //       ],
    //     });
    
    //     if (!user) {
    //       throw new Error("User not found");
    //     }
    
    //     const roles = user.roles?.map((role) => role.name) ?? [];
    //     const permissions = user.roles
    //                         ?.flatMap((role) => role.permissions?.map((perm) => perm.name) ?? [])
    //                         ?? [];
    
    //     return { roles, permissions };
    // }

    async getRoles({ sortField, sortOrder, page, limit }: QueryParams) {
        const offset = (page - 1) * limit;

        const { rows: users, count: total } = await RoleRepository.findAndCountAll({
            where: {}, // Add filters if needed
            // include: [{ all: true }],
            order: [[sortField, sortOrder]],
            limit,
            offset,
        });

        return {
            total,
            page,
            limit: limit,
            data: users,
        };
    }
}

export default new RbacService();