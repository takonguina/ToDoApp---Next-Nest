import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from 'src/models/task.model';
import { CreateTaskDto } from 'src/dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task) private readonly taskModel: typeof Task) {}

  async createTask(task: CreateTaskDto): Promise<Task> {
    const { shortDescription, longDescription, dueDate, taskListId } = task;

    if (!shortDescription || !dueDate) {
      throw new BadRequestException('Missing required fields');
    }

    const dueDateObject = new Date(dueDate);

    // Check if is a valid date
    if (isNaN(dueDateObject.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    // Check if the due date is in the future
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayTimestamp = today.getTime();
    const dueDateTimestamp = dueDateObject.getTime();

    if (dueDateTimestamp < todayTimestamp) {
      throw new BadRequestException("Due date can't be in the past");
    }

    // Check if the task already exists
    // const existingTask = await this.taskModel.findOne({
    //   where: { shortDescription, taskListId },
    // });
    // if (existingTask) {
    //   throw new BadRequestException('Task already exists');
    // }

    return this.taskModel.create({
      shortDescription,
      longDescription,
      dueDate,
      taskListId,
    });
  }

  async deleteTask(taskId: number): Promise<{ message: string }> {
    const task = await this.taskModel.findOne({
      where: { id: taskId },
    });

    if (!task) {
      throw new BadRequestException('Task not found');
    }

    await task.destroy();
    return { message: 'Task successfully deleted' };
  }

  async updateTask(taskId: number): Promise<Task> {
    const task = await this.taskModel.findOne({
      where: { id: taskId },
    });

    if (!task) {
      throw new BadRequestException('Task not found');
    }

    task.completed = !task.completed;
    await task.save();

    return task;
  }
}
