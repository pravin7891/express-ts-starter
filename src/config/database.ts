import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
import databaseConfig from "../config/config"; // Import config.js

const env = process.env.NODE_ENV || "development"; // Default to development
const config = (databaseConfig as any)[env]; // Get the config for the current env
const sequelize = new Sequelize(config);

export default sequelize;