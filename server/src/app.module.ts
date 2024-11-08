import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './config/database.config';
import { Sequelize } from 'sequelize-typescript';

// modules
import { UserModule } from './modules/user.modules';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot(databaseConfig),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private sequelize: Sequelize) {}

  async onModuleInit() {
    // Synchronizing models with the database
    await this.sequelize.sync({ alter: true }); // Create or update tables
  }
}
