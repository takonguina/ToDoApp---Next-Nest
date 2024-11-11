import { Module } from '@nestjs/common';
import { Task } from 'src/models/task.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskController } from 'src/controllers/task.controller';
import { isAuthorizedGuard } from 'src/guards/is-authorized.guard';
import { IsAuthenticatedGuard } from 'src/guards/is-authenticated.guard';
import { TaskService } from 'src/services/task.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Task]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [TaskController],
  providers: [TaskService, IsAuthenticatedGuard, isAuthorizedGuard],
})
export class TaskModule {}
