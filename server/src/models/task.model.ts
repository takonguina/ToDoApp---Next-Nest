import {
  Column,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { TaskList } from './tasklist.model';
import { BadRequestException } from '@nestjs/common';

@Table
export class Task extends Model<Task> {
  @Column({
    validate: {
      allowNull: false,
      // Check if the string is not empty
      notEmpty: true,
    },
  })
  shortDescription: string;

  @Column({ allowNull: true })
  longDescription: string;

  @Column({
    validate: {
      allowNull: false,
      isDate: true,
      // Custom validation
      // Check if the due date is in the future
      isPast(value: Date) {
        const today = new Date();
        const dueDate = new Date(value);

        if (dueDate.getTime() < today.setHours(0, 0, 0, 0)) {
          throw new BadRequestException("Due date can't be in the past");
        }
      },
    },
  })
  dueDate: Date;

  @Default(false)
  @Column
  completed: boolean;

  @ForeignKey(() => TaskList)
  @Column
  taskListId: number;
}
