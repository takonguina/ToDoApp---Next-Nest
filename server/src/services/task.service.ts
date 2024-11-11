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
}
