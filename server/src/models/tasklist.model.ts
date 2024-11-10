import { User } from './user.model';
import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';

@Table
export class TaskList extends Model<TaskList> {
  @Column
  name: string;

  @ForeignKey(() => User)
  @Column
  userId: number;
}
