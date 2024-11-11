import * as dotenv from 'dotenv';
import { User } from '../models/user.model';
import { Task } from 'src/models/task.model';
import { TaskList } from 'src/models/tasklist.model';
import { SequelizeOptions } from 'sequelize-typescript';

dotenv.config();

export const databaseConfig: SequelizeOptions = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [User, TaskList, Task],
  sync: { alter: true },
};
