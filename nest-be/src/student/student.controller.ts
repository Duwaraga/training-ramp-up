/* eslint-disable prettier/prettier */
import {
  Controller,
  Body,
  Post,
  Get,
  Delete,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { StudentDto } from './../dto/student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Get()
  async getStudent() {
    const student = await this.studentService.getAll();
    if (!student) return { msg: 'Error occured to get the student' };
    return student;
  }

  @Post()
  async addStudent(@Body() data: StudentDto) {
    console.log('STUDENTDTO ', data);
    const student = await this.studentService.addOne(data);
    if (!student) return { msg: 'Error occured to post a student' };
    return student;
  }
  @Delete('/:id')
  async deleteStudent(@Req() req) {
    const student = await this.studentService.deleteOne(
      parseInt(req.params.ID),
    );
    if (!student) return { msg: 'Error occured to delete a student' };
    console.log('student', student);
    return student;
  }

  @Put('/:id')
  async updateStudent(@Req() req, @Res() res) {
    const student = req.body;
    try {
      const user = await this.studentService.updateOne(student);
      console.log('USERDATA', student);
      if (!user) return res.json('Error occured to update student');
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}