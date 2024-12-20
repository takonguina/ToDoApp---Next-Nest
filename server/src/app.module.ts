import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './config/database.config';
import { Sequelize } from 'sequelize-typescript';

// modules
import { AuthModule } from './modules/auth.module';
import { TaskListModule } from './modules/tasklist.module';
import { TaskModule } from './modules/task.module';
import { APP_FILTER } from '@nestjs/core';
import { NotFoundExceptionFilter } from './filters/not-found-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot(databaseConfig),
    AuthModule,
    TaskListModule,
    TaskModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
  ],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    const sequelize = new Sequelize(databaseConfig);

    try {
      await sequelize.authenticate();
      // Sync all models that are not yet in the database
      await sequelize.sync({ alter: true });
    } catch (error) {
      console.error('Database connection error:', error);
    }
  }
}
