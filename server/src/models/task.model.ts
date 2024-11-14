import {
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { TaskList } from './tasklist.model';

@Table
export class Task extends Model<Task> {
  @Column({
    allowNull: false,
    validate: {
      // Check if the string is not empty
      notEmpty: true,
    },
  })
  shortDescription: string;

  @Column({ allowNull: true })
  longDescription: string;

  @Column({
    allowNull: false,
    validate: {
      isDate: true,
    },
  })
  dueDate: Date;

  @Default(false)
  @Column
  completed: boolean;

  @ForeignKey(() => TaskList)
  @Column
  taskListId: number;

  // Define the relationship between the Task and TaskList models
  @BelongsTo(() => TaskList, {
    // When a TaskList is deleted, delete all associated tasks
    onDelete: 'CASCADE',
  })
  taskList: TaskList;
}
