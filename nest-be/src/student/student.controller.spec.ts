/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentDto } from './../dto/student.dto';
import { Student } from '../entity/student.entity';

describe('StudentController', () => {
  let controller: StudentController;
  let studentService: StudentService;

  const BobData = [
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
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        StudentService,
        {
          provide: StudentService,
          useValue: {
            getAll: jest.fn(() => {
              return BobData;
            }),
            addOne: jest.fn((x) => {
              if (!x) {
                return null;
              } else {
                BobData.push(x);
                return x;
              }
            }),
            deleteOne: jest.fn((x) => {
              if (!x) {
                return null;
              } else {
                const index = BobData.map((object) => object.ID).indexOf(x);
                BobData.splice(1, index);
                return BobData;
              }
            }),
            updateOne: jest.fn((x) => {
              if (x == null) {
                return null;
              } else {
                const index = BobData.map((object) => object.ID).indexOf(x.ID);
                BobData.splice(index, 1, x);
                return BobData;
              }
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    studentService = module.get<StudentService>(StudentService);
  });

  it('Controller describes here', () => {
    expect(controller).toBeDefined();
  });
  it('Services describes here', () => {
    expect(studentService).toBeDefined();
  });
  describe('Get student works successfully', () => {
    it('Get student ', async () => {
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

      const res = await controller.getStudent();
      expect(res).toStrictEqual(student);
    });
    it('Get student fails', async () => {
      jest.spyOn(studentService, 'getAll').mockResolvedValue(null);
      const res = await controller.getStudent();
      expect(res).toStrictEqual({ msg: 'Error occured to get the student' });
    });
  });

  describe('Student created successfully', () => {
    it('Student should be created', async () => {
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

      const res = await controller.addStudent(req);
      expect(res).toStrictEqual(studentBob);
    });
    it('Student create fails', async () => {
      const res = await controller.addStudent(null);
      expect(res).toStrictEqual({ msg: 'Error occured to post a student' });
    });
  });
  describe('Student was deleted successfully', () => {
    const bob = [
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
        ID: 1,
        studentName: 'bob',
        gender: 'Male',
        address: 'bobAddress',
        mobileNo: '0769879876',
        dob: new Date('1997-12-05 00:00:00'),
        age: 25,
      },
    ];
    const req = {
      params: {
        ID: 1,
      },
    };
    it('Student should be deleted', async () => {
      const res = await controller.deleteStudent(req);
      expect(res).toStrictEqual(bob);
    });
    it('student delete fails', async () => {
      const req = {
        params: {
          ID: null,
        },
      };

      const res = await controller.deleteStudent(req);
      expect(res).toStrictEqual({ msg: 'Error occured to delete a student' });
    });
  });
  describe('Update Student ', () => {
    it('Student should be updated', async () => {
      const request = {
        body: {
          ID: 1,
          studentName: 'bob',
          gender: 'Male',
          address: 'bobAddress',
          mobileNo: '0769879876',
          dob: new Date('1997-12-05 00:00:00'),
          age: 25,
        },
      };
      const response = {
        json: jest.fn((x) => x),
        send: jest.fn(() => [
          {
            ID: 1,
            studentName: 'Mark',
            gender: 'Male',
            address: 'bobAddress',
            mobileNo: '0769879876',
            dob: new Date('1997-12-05 00:00:00'),
            age: 25,
          },
        ]),
      };
      const updatedStudent = {
        ID: 1,
        studentName: 'Mark',
        gender: 'Male',
        address: 'bobAddress',
        mobileNo: '0769879876',
        dob: new Date('1997-12-05 00:00:00'),
        age: 25,
      } as Student;

      jest.spyOn(studentService, 'updateOne').mockResolvedValue(updatedStudent);
      const res = await controller.updateStudent(request, response);
      console.log('RESDATA', res);
      expect(res).toStrictEqual(updatedStudent);
    });
    it('Student update fails', async () => {
      const request = {
        body: null,
      };
      const response = {
        json: jest.fn((x) => x),
      };

      jest.spyOn(studentService, 'updateOne').mockResolvedValue(null);
      const res = await controller.updateStudent(request, response);
      expect(res).toStrictEqual('Error occured to update student');
    });
  });
});
