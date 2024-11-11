import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { TaskList } from 'src/models/tasklist.model';

@Injectable()
export class isAuthorizedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const taskListId = request.params.taskListId;

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
