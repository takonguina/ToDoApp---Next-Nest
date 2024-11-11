import { Module } from '@nestjs/common';
import { Task } from 'src/models/task.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskController } from 'src/controllers/task.controller';
import { isAuthorizedGuard } from 'src/guards/is-authorized.guard';
import { IsAuthenticatedGuard } from 'src/guards/is-authenticated.guard';

@Module({
  imports: [SequelizeModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [IsAuthenticatedGuard, isAuthorizedGuard],
})
export class TaskModule {}
