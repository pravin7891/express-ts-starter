import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../../config/database";
import User from "./User";

interface LoginHistoryAttributes {
  id: number;
  userId: number;
  deviceName: string;
  deviceOS: string;
  ipAddress: string;
  browserName: string;
  isActive: boolean;
}

interface LoginHistoryCreationAttributes extends Optional<LoginHistoryAttributes, "id"> {}

class LoginHistory extends Model<LoginHistoryAttributes, LoginHistoryCreationAttributes> {
  public id!: number;
  public userId!: number;
  public deviceName!: string;
  public deviceOS!: string;
  public ipAddress!: string;
  public browserName!: string;
  public isActive!: boolean;
}

LoginHistory.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    deviceName: { type: DataTypes.STRING, allowNull: false },
    deviceOS: { type: DataTypes.STRING, allowNull: false },
    ipAddress: { type: DataTypes.STRING, allowNull: false },
    browserName: { type: DataTypes.STRING, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { sequelize, modelName: "LoginHistory" }
);

// Define association
LoginHistory.belongsTo(User, { foreignKey: "userId", as: "user" });

export default LoginHistory;