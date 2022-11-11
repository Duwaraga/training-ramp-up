/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { Student } from '../entity/student.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentDto } from 'src/dto/student.dto';

describe('StudentService', () => {
  let service: StudentService;
  let studentRepository: Repository<Student>;

  const student = [
    {
      ID: 1,
      studentName: 'bob',
      gender: 'Male',
      address: 'bobAddress',
      mobileNo: '0769879876',
      dob: new Date('1997-12-05 00:00:00'),
      age: 25,
    },
    {
      ID: 2,
      studentName: 'bob',
      gender: 'Male',
      address: 'bobAddress',
      mobileNo: '0769879876',
      dob: new Date('1997-12-05 00:00:00'),
      age: 25,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),

          useValue: {
            find: jest.fn(() => [
              {
                ID: 1,
                studentName: 'bob',
                gender: 'Male',
                address: 'bobAddress',
                mobileNo: '0769879876',
                dob: new Date('1997-12-05 00:00:00'),
                age: 25,
              },
            ]),
            save: jest.fn((x) => {
              if (!x) {
                return null;
              } else {
                student.push(x);
                return x;
              }
            }),
            findOne: jest.fn((x) => {
              const index = student
                .map((object) => object.ID)
                .indexOf(x.where.ID);
              if (index == -1) {
                return null;
              } else {
                return student[index];
              }
            }),
            merge: jest.fn((x, y) => {
              x = y;
              return x;
            }),
            remove: jest.fn((x) => {
              const index = student.map((object) => object.ID).indexOf(x.ID);
              student.splice(1, index);
              return student;
            }),
            findOneBy: jest.fn((x) => {
              const index = student.map((object) => object.ID).indexOf(x.ID);
              if (index == -1) {
                return null;
              } else {
                return student[index];
              }
            }),
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
          ID: 1,
          studentName: 'bob',
          gender: 'Male',
          address: 'bobAddress',
          mobileNo: '0769879876',
          dob: new Date('1997-12-05 00:00:00'),
          age: 25,
        },
      ];
      const res = await service.getAll();
      expect(res).toEqual(student);
    });
  });
  describe('Create Student', () => {
    it('it should create success', async () => {
      const studentBob = {
        ID: 1,
        studentName: 'bob',
        gender: 'Male',
        address: 'bobAddress',
        mobileNo: '0769879876',
        dob: new Date('1997-12-05 00:00:00'),
        age: 25,
      };
      const req: StudentDto = {
        ID: 1,
        studentName: 'bob',
        gender: 'Male',
        address: 'bobAddress',
        mobileNo: '0769879876',
        dob: new Date('1997-12-05 00:00:00'),
        age: 25,
      };
      const res = await service.addOne(req);
      expect(res).toEqual(studentBob);
    });
    it('student create fails', async () => {
      const req = null;
      const res = await service.addOne(req);
      expect(res).toEqual(null);
    });
  });
  describe('Delete Student', () => {
    it('it should delete success', async () => {
      const req = 2;
      const student1 = {
        ID: 2,
        studentName: 'bob',
        gender: 'Male',
        address: 'bobAddress',
        mobileNo: '0769879876',
        dob: new Date('1997-12-05 00:00:00'),
        age: 25,
      };

      const res = await service.deleteOne(req);
      expect(res).toEqual(student1);
    });
    it('student delete fail', async () => {
      const req = 10;
      const res = await service.deleteOne(req);
      expect(res).toEqual(null);
    });
  });
  describe('Update Student', () => {
    it('it should Update success', async () => {
      const student1 = {
        ID: 1,
        studentName: 'bob',
        gender: 'Male',
        address: 'bobAddress',
        mobileNo: '0769879876',
        dob: new Date('1997-12-05 00:00:00'),
        age: 25,
      };

      const student2 = {
        ID: 1,
        studentName: 'bob',
        gender: 'Male',
        address: 'bobAddress',
        mobileNo: '0769879876',
        dob: new Date('1997-12-05 00:00:00'),
        age: 25,
      };

      const res = await service.updateOne(student1);
      expect(res).toEqual(student2);
    });

    it('student update fail', async () => {
      const req = {
        ID: 10,
        mobileNo: '0714567890',
      };

      const res = await service.updateOne(req);
      expect(res).toEqual({ msg: 'student not found' });
    });
  });
});
