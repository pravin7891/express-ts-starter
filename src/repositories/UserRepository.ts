import Role from "../database/models/Role";
import User from '../database/models/User';
import BaseRepository from "./BaseRepository";
import Permission from "../database/models/Permission";

class UserRepository extends BaseRepository<User> {
    constructor() {
      super(User);
    }
    async createUser(userData: any) {
        return await User.create(userData);
    }

    async findByEmail(email: string) {
        return await User.findOne({ where: { email } });
    }
    async getUserByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email } });
    }
    async findById(id: number) {
        return await User.findByPk(id);
    }
    async updateUser(id: number, data: Partial<User>): Promise<User | null> {
        const user = await User.findByPk(id);
        if (!user) return null;
    
        await user.update(data);
        return user;
    }
  async getUserWithRoles(userId: number) {
    return await User.findByPk(userId, {
      include: {
        model: Role,
        include: [
            {
                model: Permission,
            }
        ],
      },
    });
  }
}
export default new UserRepository();