import {
  Body,
  Controller,
  Delete,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { IsAuthenticatedGuard } from 'src/guards/is-authenticated.guard';
import { isAuthorizedGuard } from 'src/guards/is-authorized.guard';
import { TaskService } from 'src/services/task.service';
import { Task } from 'src/models/task.model';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // route create task
  @Post(':taskListId')
  @UseGuards(IsAuthenticatedGuard, isAuthorizedGuard)
  async createTask(@Request() req, @Body() body): Promise<Task> {
    return this.taskService.createTask({
      shortDescription: body.shortDescription,
      longDescription: body.longDescription,
      dueDate: body.dueDate,
      taskListId: req.params.taskListId,
    });
  }

  // route delete task
  @Delete(':taskListId/:taskId')
  @UseGuards(IsAuthenticatedGuard, isAuthorizedGuard)
  async deleteTask(@Request() req): Promise<{ message: string }> {
    const taskId = parseInt(req.params.taskId);
    return this.taskService.deleteTask(taskId, req.params.taskListId);
  }
}
