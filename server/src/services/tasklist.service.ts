import { Task } from 'src/models/task.model';
import { InjectModel } from '@nestjs/sequelize';
import { TaskList } from 'src/models/tasklist.model';
import { CreateTaskListDto } from 'src/dto/create-tasklist.dto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class TaskListService {
  constructor(
    @InjectModel(TaskList) private readonly taskListModel: typeof TaskList,
    @InjectModel(Task) private readonly taskModel: typeof Task,
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
      throw new ConflictException('Task list already exists');
    }

    return this.taskListModel.create({ name, userId });
  }

  async getTaskLists(userId: number): Promise<TaskList[]> {
    return this.taskListModel.findAll({ where: { userId }, include: [Task] });
  }

  async deleteTaskList(taskListId: number): Promise<{ message: string }> {
    const taskList = await this.taskListModel.findOne({
      where: { id: taskListId },
    });

    if (!taskList) {
      throw new BadRequestException('Task list not found');
    }

    await taskList.destroy();

    return { message: 'Task list deleted' };
  }
}
