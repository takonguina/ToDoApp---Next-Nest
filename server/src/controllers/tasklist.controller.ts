import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { TaskListService } from 'src/services/tasklist.service';
import { IsAuthenticatedGuard } from 'src/guards/is-authenticated.guard';
import { isAuthorizedGuard } from 'src/guards/is-authorized.guard';

@Controller('tasklist')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Post()
  @UseGuards(IsAuthenticatedGuard)
  async createTaskList(@Request() req, @Body() body): Promise<any> {
    return this.taskListService.createTaskList({
      name: body.name,
      userId: req.user.id,
    });
  }

  @Get()
  @UseGuards(IsAuthenticatedGuard)
  async getTaskLists(@Request() req): Promise<any> {
    return this.taskListService.getTaskLists(req.user.id);
  }

  @Delete(':taskListId')
  @UseGuards(IsAuthenticatedGuard, isAuthorizedGuard)
  async deleteTaskList(@Request() req): Promise<any> {
    return this.taskListService.deleteTaskList(req.params.taskListId);
  }
}
