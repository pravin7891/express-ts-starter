import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';
import Role from "./Role";
import Post from "./Post";

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public timezone!: string;
    public profilePicture!: string | null;
    public isVerified!: boolean;
    public verificationToken!: string | null;
    public roles?: Role[];
}

User.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    timezone: {
      type: DataTypes.STRING,
      allowNull: true, // Store "America/New_York", "Asia/Kolkata", etc.
    },
    profilePicture: { type: DataTypes.STRING, allowNull: true },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verificationToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
}, { sequelize, modelName: 'User', tableName: 'users', timestamps: true });

setImmediate(() => {
  User.belongsToMany(Role, { through: "user_roles", foreignKey: "userId", as: "roles" });
  User.hasMany(Post, { foreignKey: "userId", onDelete: "CASCADE" });
  Role.belongsToMany(User, { through: "UserRoles", as: "users" });
})
export default User;