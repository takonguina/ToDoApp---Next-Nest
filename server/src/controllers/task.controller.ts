import {
  Body,
  Controller,
  Delete,
  Patch,
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
  @Delete(':taskId')
  @UseGuards(IsAuthenticatedGuard, isAuthorizedGuard)
  async deleteTask(@Request() req): Promise<{ message: string }> {
    return this.taskService.deleteTask(req.params.taskId);
  }

  // route update task
  @Patch(':taskId')
  @UseGuards(IsAuthenticatedGuard, isAuthorizedGuard)
  async updateTask(@Request() req): Promise<Task> {
    return this.taskService.updateTask(req.params.taskId);
  }
}
