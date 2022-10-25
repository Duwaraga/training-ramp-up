/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../entity/student.entity';
// import { StudentDto } from '../dto/student.dto';
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
        error: "Couldn't retrieve the students",
      };
    }
  }

  async addOne(student: any) {
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
        where: { ID: data.id },
      });

      const newStudent = this.studentRepository.merge(student, data.body);
      console.log('NewStudent', newStudent);
      const result = await this.studentRepository.save(student);
      if (!result) {
        return {error: 'student update fail'};
      }

      return result;
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
