import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskList } from 'src/models/tasklist.model';
import { TaskListService } from 'src/services/tasklist.service';
import { TaskListController } from 'src/controllers/tasklist.controller';
import { IsAuthenticatedGuard } from 'src/guards/is-authenticated.guard';

@Module({
  imports: [
    SequelizeModule.forFeature([TaskList]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [TaskListController],
  providers: [TaskListService, IsAuthenticatedGuard],
})
export class TaskListModule {}