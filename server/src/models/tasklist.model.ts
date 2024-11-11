import { User } from './user.model';
import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';

@Table
export class TaskList extends Model<TaskList> {
  @Column({
    validate: {
      allowNull: false,
      notEmpty: true,
    },
  })
  name: string;

  @ForeignKey(() => User)
  @Column
  userId: number;
}
