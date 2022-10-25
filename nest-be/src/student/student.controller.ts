/* eslint-disable prettier/prettier */
import { Controller, Body, Post, Get, Delete, Put, Req } from '@nestjs/common';
import { StudentDto } from './../dto/student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Get()
  async getStudent() {
    const student = await this.studentService.getAll();
    return student;
  }

  @Post()
  async addStudent(@Body() data:StudentDto) {
    console.log("STUDENTDTO " , data);
    return await this.studentService.addOne(data);
  }

  @Delete('/:id')
  async deleteStudent(@Req() req) {
    return await this.studentService.deleteOne(parseInt(req.params.id));
  }

  @Put('/:id')
  async updateStudent(@Req() req) {
    const student = { id: req.params.id, body: req.body };

    try {
      const user = await this.studentService.updateOne(student);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
