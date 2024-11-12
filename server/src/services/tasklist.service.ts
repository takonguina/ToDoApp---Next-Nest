import { Task } from 'src/models/task.model';
import { InjectModel } from '@nestjs/sequelize';
import { TaskList } from 'src/models/tasklist.model';
import { CreateTaskListDto } from 'src/dto/create-tasklist.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class TaskListService {
  constructor(
    @InjectModel(TaskList) private readonly taskListModel: typeof TaskList,
  ) {}

  async createTaskList(
    createTaskListDto: CreateTaskListDto,
  ): Promise<TaskList> {
    const { name, userId } = createTaskListDto;
    if (!name) {
      throw new BadRequestException('Name is required');
    }

    // Check if the task list already exists
    const existingTaskList = await this.taskListModel.findOne({
      where: { name, userId },
    });
    if (existingTaskList) {
      throw new BadRequestException('Task list already exists');
    }

    return this.taskListModel.create({ name, userId });
  }

  async getTaskLists(userId: number): Promise<TaskList[]> {
    return this.taskListModel.findAll({ where: { userId }, include: [Task] });
  }
}
