import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TaskListService } from 'src/services/tasklist.service';
import { IsAuthenticatedGuard } from 'src/guards/is-authenticated.guard';

@Controller('tasklist')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Post()
  @UseGuards(IsAuthenticatedGuard)
  async createTaskList(@Request() req, @Body() body): Promise<any> {
    return this.taskListService.createTaskList(body.name, req.user.id);
  }

  @Get()
  @UseGuards(IsAuthenticatedGuard)
  async getTaskLists(@Request() req): Promise<any> {
    return this.taskListService.getTaskLists(req.user.id);
  }
}
