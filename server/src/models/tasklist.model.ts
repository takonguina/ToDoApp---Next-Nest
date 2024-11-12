import { Task } from './task.model';
import { User } from './user.model';
import {
  Table,
  Column,
  Model,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';

@Table
export class TaskList extends Model<TaskList> {
  @Column({
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  name: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @HasMany(() => Task)
  tasks: Task[];
}
