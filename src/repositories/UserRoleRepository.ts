import UserRole from "../database/models/UserRole";
import BaseRepository from "./BaseRepository";

export class UserRoleRepository extends BaseRepository<UserRole> {
    constructor() {
      super(UserRole);
    }
  static async assignRole(userId: number, roleId: number) {
    return await UserRole.create({ user_id: userId, role_id: roleId });
  }

  static async removeRole(userId: number, roleId: number) {
    return await UserRole.destroy({ where: { user_id: userId, role_id: roleId } });
  }

  static async getUserRoles(userId: number) {
    return await UserRole.findAll({ where: { user_id: userId } });
  }
}