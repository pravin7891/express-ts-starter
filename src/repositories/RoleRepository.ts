import Role from "../database/models/Role";
import UserRole from "../database/models/UserRole";
import BaseRepository from "./BaseRepository";

class RoleRepository extends BaseRepository<Role> {
    constructor() {
      super(Role);
    }
    async getUserRoles(userId: number): Promise<{ id: number, name:string }[]> {
      const userroles = await UserRole.findAll({
          where: { userId },
          include: [
            { model: Role, attributes: ["id", "name"], as: 'role', required: true }
          ],
      });
      return userroles.map(userrole => ({ id: userrole.role!.id!, name: userrole.role!.name }));
                  // .filter(role => role.id !== undefined) as { id: number }[];;
  }
}
export default new RoleRepository();