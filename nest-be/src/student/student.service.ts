/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../entity/student.entity';
import { StudentDto } from '../dto/student.dto';
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async getAll() {
    try {
      const student = await this.studentRepository.find();
      return student;
    } catch (error) {
      console.log(error);
      return {
        error: 'Error occured to get the student',
      };
    }
  }

  async addOne(student: StudentDto) {
    try {
      const studentData = await this.studentRepository.save(student);
      return studentData;
    } catch (error) {
      console.log(error);
      return { error: 'Failed to add student' };
    }
  }

  async updateOne(data) {
    try {
      const student = await this.studentRepository.findOne({
        where: { ID: parseInt(data.ID) },
      });
      console.log('STUDENT DATA', student);
      if (!student) {
        return { msg: 'student not found' };
      } else {
        const newStudent = this.studentRepository.merge(student, data);
        console.log('NewStudent', newStudent);
        const result = await this.studentRepository.save(newStudent);
        if (!result) {
          return { error: 'student update fail' };
        }
        return result;
      }
    } catch (error) {
      console.log(error);
      return { error: 'student update fail' };
    }
  }
  async deleteOne(ID: number) {
    try {
      const student = await this.studentRepository.findOneBy({ ID });
      if (student) {
        await this.studentRepository.remove(student);
      }
      return student;
    } catch (error) {
      console.log(error);
      return { error: 'Failed to delete the student' };
    }
  }
}
