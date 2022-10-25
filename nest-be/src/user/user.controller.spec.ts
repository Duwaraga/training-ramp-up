/* eslint-disable prettier/prettier */
// /* eslint-disable @typescript-eslint/no-var-requires */
// /* eslint-disable prettier/prettier */
// import { Test, TestingModule } from '@nestjs/testing';
// import { UserController } from './user.controller';
// import { UserService } from './user.service';
// const jwt = require('jsonwebtoken');
// describe('UserController', () => {
//   let controller: UserController;
//   let userService: UserService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UserController],
//       providers: [
//         UserService,
//         {
//           provide: UserService,
//           useValue: {
//             userRegister: jest.fn((x) => x),
//             loginUser: jest.fn((x) => x),
//           },
//         },
//       ],
//     }).compile();

//     controller = module.get<UserController>(UserController);
//     userService = module.get<UserService>(UserService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
//   it('should be defined', () => {
//     expect(userService).toBeDefined();
//   });
//   describe('user Register', () => {
//     it('get user success controller', async () => {
//       const user = {
//         name: 'test',
//         email: 'bob@gmail.com',
//         password: 'abc@123',
//       } as any;

//       const res = await controller.signUp(user);
//       expect(res).toStrictEqual(user);
//     });
//     it('get student fails controller', async () => {
//       const res = await controller.signUp(null);
//       expect(res).toStrictEqual(null);
//     });
//     it('get user success userService', async () => {
//       const user = {
//         name: 'test',
//         email: 'bob@gmail.com',
//         password: 'abc@123',
//       } as any;
//       const res = await userService.userRegister(user);
//       expect(res).toStrictEqual(user);
//     });
//     it('get user success userService', async () => {
//       const user = {
//         name: 'test',
//         email: 'bob@gmail.com',
//         password: 'abc@123',
//       } as any;
//       const res = await userService.userRegister(null);
//       expect(res).toStrictEqual(null);
//     });
//   });
//   describe('Login', () => {
//     it(' log user service success', async () => {
//       const user = {
//         query: {
//           email: 'test@gmail.com',
//           password: 'password',
//         },
//       } as never;

//       const res = await userService.loginUser(user);
//       expect(res).toEqual(user);
//     });

//     it('log user service  error', async () => {
//       const res = await userService.loginUser(null);
//       expect(res).toStrictEqual(null);
//     });
//     it('log user  controller success', async () => {
//       const user = {
//         query: {
//           name: 'test',
//           email: 'bob@gmail.com',
//           password: 'abc@123',
//         },
//       } as any;
//       const userDetails = {
//         user: {
//           name: 'test',
//           email: 'bob@gmail.com',
//           password: 'abc@123',
//         },
//       } as any;
//       const resUser = {
//         email: 'bob@gmail.com',
//         name: 'test',
//         password: 'abc@123',
//       };

//       jest.spyOn(userService, 'loginUser').mockResolvedValue(userDetails);
//       jest.spyOn(jwt, 'sign').mockResolvedValue(user);
//       const res = await controller.signIn(user);
//       await expect(res.email).toBe(resUser.email);
//     });
//   });
// });


import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
// import { Users } from '../entity/user.entity';
import { UserService } from './user.service';
import { UserDto } from 'src/dto/user.dto';
// import jwt from 'jsonwebtoken';
describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  // const userData = [
  //   {
  //     name: 'test1',
  //     email: 'test1@t.com',
  //     password: 'testpw',
  //   },
  // ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: UserService,

          useValue: {
            userRegister: jest.fn((x) => {
              if (!x) {
                return null;
              } else return x;
            }),
            loginUser: jest.fn((x) => {
              return { user: x };
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
  describe('user Register', () => {
    it('get user success controller', async () => {
      const req: UserDto = {
        User: 'bob',
        email: 'bob@gmail.com',
        password: 'abcd'
      };

      const res = await controller.signUp(req);
      expect(userService.userRegister).toBeCalled();
      expect(res).toStrictEqual(req);
    });
    it('get student fails controller', async () => {
      const req = null;
      const res = await controller.signUp(req);
      expect(res).toStrictEqual({ error: 'User Register fail' });
    });
  });

  describe('Login', () => {
    it(' log user service success', async () => {
      const req = {
        query: {
          email: 'test@t.com',
          password: 'password',
        },
      } as never;

      const user = {
        user:{
          email: 'test@t.com',
          password: 'password',
        }
    
      };

      const res = await controller.signIn(req);
      console.log('RES', res);
      expect(res).toEqual(user);
    });
    it('user login fail', async () => {
      const req = {
        query: {
          email: 'bob@gmail.com',
          password: 'abc',
        },
      };
      jest
        .spyOn(userService, 'loginUser')
        .mockResolvedValueOnce(null );
      const res = await controller.signIn(req);
      expect(res).toEqual({ error: 'User Not here' });
    });
  });
});