import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Task } from 'src/models/task.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskList } from 'src/models/tasklist.model';
import { TaskService } from 'src/services/task.service';
import { TaskController } from 'src/controllers/task.controller';
import { isAuthorizedGuard } from 'src/guards/is-authorized.guard';
import { IsAuthenticatedGuard } from 'src/guards/is-authenticated.guard';

@Module({
  imports: [
    SequelizeModule.forFeature([Task, TaskList]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [TaskController],
  providers: [TaskService, IsAuthenticatedGuard, isAuthorizedGuard],
})
export class TaskModule {}
