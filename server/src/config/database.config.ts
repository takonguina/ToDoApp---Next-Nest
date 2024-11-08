import { SequelizeOptions } from 'sequelize-typescript';
import { User } from '../models/user.model';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseConfig: SequelizeOptions = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [User],
  sync: { force: true },
};
