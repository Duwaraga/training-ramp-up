/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

describe('StudentController', () => {
  let controller: StudentController;
  let studentService: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        StudentService,
        {
          provide: StudentService,
          useValue: {
            getAll: jest.fn(() => [
              {
                id: 1,
                name: 'bob',
                gender: 'Male',
                address: 'bobAddress',
                mobileNo: '0769879876',
                birth: new Date('1997-12-05 00:00:00'),
                age: '25',
              } as any,
            ]),
            addOne: jest.fn((x) => x),
            deleteOne: jest.fn((x) => x),
            updateOne: jest.fn((x) => x),
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
    it('student should be created', async () => {
      const student = [
        {
          id: 1,
          name: 'bob',
          gender: 'Male',
          address: 'bobAddress',
          mobileNo: '0769879876',
          birth: new Date('1997-12-05 00:00:00'),
          age: '25',
        } as any,
      ];

      await studentService.getAll();
      const res = await controller.getStudent();
      expect(res).toStrictEqual(student);
    });
    it('Get student fails', async () => {
      jest.spyOn(studentService, 'getAll').mockResolvedValue(null);
      const res = await controller.getStudent();
      expect(res).toStrictEqual(null);
    });
  });

  describe('Student created successfully', () => {
    it('Student should be created', async () => {
      const studentBob = {
        id: 1,
        name: 'bob',
        gender: 'Male',
        address: 'bobAddress',
        mobileNo: '0769879876',
        birth: new Date('1997-12-05 00:00:00'),
        age: '25',
      } as any;
      const studentBobby = {
        id: 1,
        name: 'bob',
        gender: 'Male',
        address: 'bobAddress',
        mobileNo: '0769879876',
        birth: new Date('1997-12-05 00:00:00'),
        age: '25',
      } as any;

      await studentService.addOne(studentBob);
      const res = await controller.addStudent(studentBobby);
      expect(res).toStrictEqual(studentBob);
    });
    it('Student create fails', async () => {
      await studentService.addOne(null);
      const res = await controller.addStudent(null);
      expect(res).toStrictEqual(null);
    });
  });
  describe('Student was deleted successfully', () => {
    it('Student should be deleted', async () => {
      const student = {
        id: 1,
        name: 'bob',
        gender: 'Male',
        address: 'bobAddress',
        mobileNo: '0769879876',
        birth: new Date('1997-12-05 00:00:00'),
        age: '25',
      } as any;
      const req = {
        params: {
          id: 1,
        },
      };
      const studentId = 1;
      const res = await controller.deleteStudent(req);
      await studentService.deleteOne(student);
      expect(res).toStrictEqual(studentId);
    });
    it('student delete fails', async () => {
      const req = {
        params: {
          id: null,
        },
      };

      await studentService.deleteOne(null);
      const res = await controller.deleteStudent(req);
      expect(res).toStrictEqual(NaN);
    });
  });
  describe('Update Student ', () => {
    it('Student should be updated', async () => {
      const student = {
        id: 1,
        name: 'bob',
        gender: 'Male',
        address: 'bobAddress',
        mobileNo: '0769879876',
        birth: new Date('1997-12-05 00:00:00'),
        age: '25',
      } as any;
      const req = {
        body: {
          id: 1,
          name: 'bob',
          gender: 'Male',
          address: 'bobAddress',
          mobileNo: '0769879876',
          birth: new Date('1997-12-05 00:00:00'),
          age: '25',
        },
        params: {
          id: 1,
        },
      };
      const res = {
        send: jest.fn(() => [
          {
            id: 1,
            name: 'bob',
            gender: 'Male',
            address: 'bobAddress',
            mobileNo: '0769879876',
            birth: new Date('1997-12-05 00:00:00'),
            age: '25',
       
      }
    ])}
      const user = {
        body: {
          id: 1,
          name: 'bob',
          gender: 'Male',
          address: 'bobAddress',
          mobileNo: '0769879876',
          birth: new Date('1997-12-05 00:00:00'),
          age: '25',
        },
        id: 1,
      } as any;

      await studentService.updateOne(student);
      const response = await controller.updateStudent(req);
      expect(response).toStrictEqual(user);
    });
    it('Student update fails', async () => {
      const req = {
        body: null,
        params: {
          id: 1,
        },
      };
      const res = {
        send: jest.fn(() => null),
      };

      await studentService.updateOne(null);
      const response = await controller.updateStudent(req);
      expect(response).toStrictEqual({ body: null, id: 1 });
    });
  });
});
