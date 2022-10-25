/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { Student } from '../entity/student.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('StudentService', () => {
  let service: StudentService;
  let studentRepository: Repository<Student>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),

          useValue: {
            find: jest.fn(() => [
              {
                id: 1,
                name: 'bob',
                gender: 'Male',
                address: 'bobAddress',
                mobileNo: '0769879876',
                birth: new Date('1997-12-05 00:00:00'),
                age: '25',
              },
            ]),
            save: jest.fn((x) => x),
            findOne: jest.fn((x) => x),
            merge: jest.fn((x, y) => x),
            remove: jest.fn((x) => x),
            findOneBy: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
    studentRepository = module.get<Repository<Student>>(
      getRepositoryToken(Student),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be defined', () => {
    expect(studentRepository).toBeDefined();
  });
  describe('Get Student', () => {
    it('it should get all student', async () => {
      const student = [
        {
          id: 1,
          name: 'bob',
          gender: 'Male',
          address: 'bobAddress',
          mobileNo: '0769879876',
          birth: new Date('1997-12-05 00:00:00'),
          age: '25',
        } as never,
      ];
      const res = await studentRepository.find();
      expect(res).toEqual(student);
    });
  });
  describe('Create Student', () => {
    it('it should create success', async () => {
      const student_02 = {
        id: 1,
        name: 'bob',
        gender: 'Male',
        address: 'bobAddress',
        mobileNo: '0769879876',
        birth: new Date('1997-12-05 00:00:00'),
        age: '25',
      } as never;
      const student_01 = {
        id: 1,
        name: 'bob',
        gender: 'Male',
        address: 'bobAddress',
        mobileNo: '0769879876',
        birth: new Date('1997-12-05 00:00:00'),
        age: '25',
      } as never;
      jest.spyOn(studentRepository, 'save').mockResolvedValueOnce(student_01);
      const res = await studentRepository.save(student_01);
      expect(res).toEqual(student_02);
    });
    it('student create fails', async () => {
      const req = {
        name: 'test',
      } as any;
      jest.spyOn(studentRepository, 'save').mockResolvedValueOnce(undefined);
      const res = await service.addOne(req);
      expect(studentRepository.save).toHaveBeenCalled();
      expect(res).toEqual(undefined);
    });

    // it('it should create fails', async () => {
    //   const res = await studentRepository.save(null);
    //   expect(res).toEqual(null);
    // });
  });
  describe('Delete Student', () => {
    it('it should delete success', async () => {
      const req = 2;
      const student1 = {
        id: 1,
        name: 'bob',
        gender: 'Male',
        address: 'bobAddress',
        mobileNo: '0769879876',
        birth: new Date('1997-12-05 00:00:00'),
        age: '25',
      } as any;
      jest
      .spyOn(studentRepository, 'findOneBy')
      .mockResolvedValueOnce(student1);

    const res = await service.deleteOne(req);
    expect(studentRepository.remove).toHaveBeenCalled();
    expect(studentRepository.findOneBy).toHaveBeenCalled();
    expect(res).toEqual(student1);
    });
    it('student delete fail', async () => {
      const req = 10;
      jest.spyOn(studentRepository, 'findOneBy').mockResolvedValueOnce(null);
      const res = await service.deleteOne(req);
      expect(res).toEqual(null);
    });
  });
  describe('Update Student', () => {
    it('it should Update success', async () => {
      const req = {
        params: {
          studnetId: 1,
        },
      } as any;
      const student1 = {
        id: 1,
        name: 'bob',
        gender: 'Male',
        address: 'bobAddress',
        mobileNo: '0769879876',
        birth: new Date('1997-12-05 00:00:00'),
        age: '25',
      } as never;
      const student2 = {
        id: 1,
        name: 'bob',
        gender: 'Male',
        address: 'bobAddress',
        mobileNo: '0769879876',
        birth: new Date('1997-12-05 00:00:00'),
        age: '25',
      } as any;

      const res = await studentRepository.findOne(student1);
      expect(res).toEqual(student1);
    });
    it('student merge', async () => {
      const student_02 = {
        id: 1,
        name: 'bob',
        gender: 'Male',
        address: 'bobAddress',
        mobileNo: '0769879876',
        birth: new Date('1997-12-05 00:00:00'),
        age: '25',
      } as never;
      const student_01 = {
        id: 1,
        name: 'bob',
        gender: 'Male',
        address: 'bobAddress',
        mobileNo: '0769879876',
        birth: new Date('1997-12-05 00:00:00'),
        age: '25',
      } as never;
      const res = studentRepository.merge(student_01, student_02);
      expect(res).toEqual(student_01);
    });
    it('it must error merge', async () => {
      const res = studentRepository.merge(null);
      expect(res).toEqual(null);
    });
  });
});
