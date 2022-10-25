/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import { Test, TestingModule } from '@nestjs/testing';
// import { UserService } from './user.service';
// import { Users } from '../entity/user.entity';
// import { Repository } from 'typeorm';
// import bcrypt from 'bcrypt';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import jwt from 'jsonwebtoken';

// describe('UserService', () => {
//   let service: UserService;
//   let userRepository: Repository<Users>;
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         UserService,
//         {
//           provide: getRepositoryToken(Users),
//           useValue: {
//             save: jest.fn(),
//             findOneBy: jest.fn((x) => x),
//             // save: jest.fn((x) => x),
//           },
//         },
//       ],
//     }).compile();

//     service = module.get<UserService>(UserService);
//     userRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
//   it('should be defined', () => {
//     expect(userRepository).toBeDefined();
//   });
//   describe('log User', () => {
//     it('it should log success', async () => {
//       // const user_02 = {
//       //   id: 1,
//       //   name: 'test',
//       //   email: 'test@gmail.com',
//       //   password: 'password',
//       //   role: 'user',
//       // } ;
//       // const user_01 = {
//       //   id: 1,
//       //   name: 'test',
//       //   email: 'test@gmail.com',
//       //   password: 'password',
//       //   role: 'user',
//       // } ;

//       const user = {
//         user: {
//           email: "test@gmail.com",
//           accessToken: "value",
//         },
//       };

//       const token = "value";

//       const req = {
//         email: "test@gmail.com",
//         password: "password",
//       };

//       // const res = await userRepository.findOneBy(user_02);
//       // expect(res).toStrictEqual(user_02);

//       jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(true);
//       jest.spyOn(jwt, "sign").mockResolvedValueOnce(token);
//       const res = await service.loginUser(req);
//       expect(userRepository.findOneBy).toHaveBeenCalled();
//       expect(res).toEqual(user);

//     });
//     // it('it must save', async () => {
//     //   const user1 = {
//     //     email: 'test@gmail.com',
//     //     password: 'password',
//     //   };
//     //   const res = await userRepository.save(user1);
//     //   expect(res).toEqual(user1);
//     // });

//   });
// });


import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { Users } from "../entity/user.entity";
import { Repository } from "typeorm";
const bcrypt = require('bcrypt');
import { getRepositoryToken } from "@nestjs/typeorm";
// import jwt from "jsonwebtoken";
const jwt = require('jsonwebtoken');

describe("UserService", () => {
  let service: UserService;
  let userRepository: Repository<Users>;
  const user = [
    {
      id: 1,
      name: "test",
      email: "test@gmail.com",
      password: "password",
      role: "User",
    },
    {
      id: 2,
      name: "test",
      email: "test@t.com",
      password: "password",
      role: "User",
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(Users),

          useValue: {
            save: jest.fn(),
            findOneBy: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should be defined", () => {
    expect(userRepository).toBeDefined();
  });
  describe("log User", () => {
    it("it should log success", async () => {
      const user = {
        
          email: "test@gmail.com",
          accessToken: "value",
        
      }as any;

      const token = "value";

      const req = {
        email: "test@gmail.com",
        password: "password",
      };

      jest.spyOn(userRepository, "findOneBy").mockResolvedValue(user);
     jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(true);
     jest.spyOn(jwt, "sign").mockResolvedValueOnce(token);
      const res = await service.loginUser(req);
      expect(userRepository.findOneBy).toHaveBeenCalled();
      expect(res).toEqual(user);
    });

    it("user service save fails", async () => {
      const req = {
        email: "123@gmail.com",
        password: "password",
      };

      const token = "value";
      jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(false);
      jest.spyOn(jwt, "sign").mockResolvedValueOnce(token);
      jest.spyOn(userRepository, "findOneBy").mockResolvedValueOnce(null);
      const res = await service.loginUser(req);
      expect(userRepository.findOneBy).toHaveBeenCalled();
      expect(res).toEqual({ error: "User not found" });
    });
  });
  describe(" User Register", () => {
    it("it should log success", async () => {
      const userData = {
        email: "test@gmail.com",
        id: 1,
        name: "test",
        password: "password",
        role: "User",
        accessToken: "value",
      } as any;
      const req = {
        name: "test",
        email: "fake@t.com",
        password: "password",
      }as any;

      jest.spyOn(bcrypt, "hashSync").mockResolvedValue("password");
      jest.spyOn(bcrypt, "genSaltSync").mockResolvedValue("pwd");
      jest.spyOn(userRepository, "findOneBy").mockResolvedValue(null);
      jest.spyOn(userRepository, "save").mockResolvedValue(userData);
      const res = await service.userRegister(req);
      expect(userRepository.findOneBy).toHaveBeenCalled();
      expect(userRepository.save).toHaveBeenCalled();
      expect(res).toEqual(userData);
    });

    it("user register service fails", async () => {
      const req = {
        name: "test",
        email: "fake@t.com",
        password: "password",
      }as any;
      const userData = {
        email: "fake@t.com",
        id: 1,
        name: "test",
        password: "password",
        role: "User",
        accessToken: "value",
      } as any;
      jest.spyOn(userRepository, "findOneBy").mockResolvedValue(userData);
      const res = await service.userRegister(req);
      expect(userRepository.findOneBy).toHaveBeenCalled();
      expect(res).toEqual({ error: "user was here" });
    });
  });
});

