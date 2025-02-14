import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';
import Role from "./Role";
import Post from "./Post";

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public profilePicture!: string | null;
    public isVerified!: boolean;
    public verificationToken!: string | null;
    Roles?: Role[];
}

User.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
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
  User.belongsToMany(Role, { through: "user_roles", foreignKey: "userId" });
  User.hasMany(Post, { foreignKey: "userId", onDelete: "CASCADE" });
})
export default User;