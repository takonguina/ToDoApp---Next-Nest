import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { IsAuthenticatedGuard } from 'src/guards/is-authenticated.guard';
import { isAuthorizedGuard } from 'src/guards/is-authorized.guard';
import { TaskService } from 'src/services/task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // route create task
  @Post(':taskListId')
  @UseGuards(IsAuthenticatedGuard, isAuthorizedGuard)
  async createTask(@Request() req, @Body() body): Promise<any> {
    return this.taskService.createTask({
      shortDescription: body.shortDescription,
      longDescription: body.longDescription,
      dueDate: body.dueDate,
      taskListId: req.params.taskListId,
    });
  }
}
