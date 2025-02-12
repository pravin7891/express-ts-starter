import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public profilePicture!: string | null;
    public isVerified!: boolean;
    public verificationToken!: string | null;
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
}, { sequelize, modelName: 'user', timestamps: true });

export default User;