"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
const User_1 = __importDefault(require("./User"));
class Post extends sequelize_1.Model {
}
Post.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    content: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    userId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
}, { sequelize: database_1.default, modelName: 'post', timestamps: true });
Post.belongsTo(User_1.default, { foreignKey: 'userId', as: 'user' });
exports.default = Post;
