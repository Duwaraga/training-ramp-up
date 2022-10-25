/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { Student } from 'src/entity/student.entity';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [StudentController],
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [StudentService],
})
export class StudentModule {}
