import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { TaskList } from 'src/models/tasklist.model';
import { Task } from 'src/models/task.model';

@Injectable()
export class isAuthorizedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    let taskListId: number | undefined;

    // If Task List ID is provided, use it
    if (request.params.taskListId) {
      taskListId = request.params.taskListId;
    }

    // If only Task ID is provided, find the Task List ID
    if (request.params.taskId) {
      const task = await Task.findOne({
        where: { id: request.params.taskId },
      });
      if (!task) {
        throw new ForbiddenException('Task not found');
      }
      taskListId = task.taskListId;
    }

    if (!taskListId) {
      throw new ForbiddenException('Task list ID not found');
    }

    // Check if the tast list belongs to the user
    const taskList = await TaskList.findOne({
      where: { id: taskListId, userId: user.id },
    });
    if (!taskList) {
      throw new ForbiddenException(
        'User is not authorized to access this task list',
      );
    }

    return true;
  }
}
