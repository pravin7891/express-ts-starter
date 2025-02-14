import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';
import User from './User';

class Post extends Model {
    public id!: number;
    public title!: string;
    public content!: string;
    public userId!: number;
}

Post.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
}, { sequelize, modelName: 'Post', tableName:'posts', timestamps: true });

setImmediate(() => {
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });
})
export default Post;