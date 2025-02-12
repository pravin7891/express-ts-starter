import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

export default sequelize;
// import { Sequelize } from "sequelize";

// const sequelize = new Sequelize({
//   dialect: "sqlite", // or "mysql" / "postgres"
//   storage: "./database.sqlite", // Change based on your database
//   logging: false,
// });

// export default sequelize;