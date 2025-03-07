import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT ?? '3307'),
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        username: process.env.DATABASE_USERNAME,
        synchronize: true,
        autoLoadModels: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
