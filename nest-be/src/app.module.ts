/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entity/student.entity';
import { Users } from './entity/user.entity';
import AdminMiddleware from './middleware/auth.middleware';
import { StudentController } from './student/student.controller';
require("dotenv").config();

@Module({
  imports: [
    StudentModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.PORT),
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      synchronize: true,
      logging: false,
      entities: [Student, Users],
      migrations: [],
      subscribers: [],

    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .forRoutes(StudentController);
  }
}


