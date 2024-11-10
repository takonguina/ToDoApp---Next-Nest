import { Module, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './config/database.config';
import { Sequelize } from 'sequelize-typescript';

// modules
import { AuthModule } from './modules/auth.module';
import { TaskListModule } from './modules/tasklist.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot(databaseConfig),
    AuthModule,
    TaskListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
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
