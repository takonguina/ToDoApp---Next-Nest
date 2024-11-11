import {
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
          throw new Error("La date d'échéance ne peut pas être dans le passé.");
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
