/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Users } from '../entity/user.entity';
import { Repository } from 'typeorm';
const bcrypt = require('bcrypt');
import { getRepositoryToken } from '@nestjs/typeorm';
const jwt = require('jsonwebtoken');

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<Users>;
  const user = [
    {
      ID: 1,
      User: 'bob',
      email: 'bob@gmail.com',
      password: 'bob@2022',
      role: 'User',
    },
    {
      ID: 2,
      User: 'alice',
      email: 'alice@gmail.com',
      password: 'alice@2022',
      role: 'User',
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(Users),

          useValue: {
            save: jest.fn((x) => {
              if (!x) {
                return null;
              } else {
                const length = user.length;
                x['ID'] = length + 1;
                x['role'] = 'User';
                user.push(x);
                return user;
              }
            }),

            findOneBy: jest.fn((x) => {
              const index = user.map((object) => object.email).indexOf(x.email);
              if (index == -1) {
                return null;
              } else {
                return user[index];
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });
  describe('log User', () => {
    it('it should log success', async () => {
      const user = {
        ID: 1,
        User: 'bob',
        email: 'bob@gmail.com',
        password: 'bob@2022',
        role: 'User',
      };

      const req = {
        email: 'bob@gmail.com',
        password: 'bob@2022',
      };

      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);
      const res = await service.loginUser(req);
      expect(res).toEqual(user);
    });

    it('user service save fails', async () => {
      const req = {
        email: '123@gmail.com',
        password: 'password',
      };

      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(null);
      const res = await service.loginUser(req);
      expect(userRepository.findOneBy).toHaveBeenCalled();
      expect(res).toEqual({ error: 'User not found' });
    });
  });
  describe(' User Register', () => {
    it('it should log success', async () => {
      const userData = {
        email: 'test@gmail.com',
        ID: 1,
        User: 'test',
        password: 'password',
      } as Users;

      const req = {
        User: 'test',
        email: 'fake@t.com',
        password: 'password',
      };


      jest.spyOn(bcrypt, 'hashSync').mockResolvedValue('password');
      jest.spyOn(bcrypt, 'genSaltSync').mockResolvedValue('pwd');
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);
      jest.spyOn(userRepository, 'save').mockResolvedValue(userData);
      const res = await service.userRegister(req);
      expect(userRepository.findOneBy).toHaveBeenCalled();
      expect(userRepository.save).toHaveBeenCalled();
      expect(res).toEqual(userData);
    });

    it('user register service fails', async () => {
      const req = {
        User: 'test',
        email: 'fake@t.com',
        password: 'password',
      };
 
      const userData = {
        email: 'fake@t.com',
        ID: 1,
        User: 'test',
        password: 'password',
      
      } as Users;
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(userData);
      const res = await service.userRegister(req);
      expect(userRepository.findOneBy).toHaveBeenCalled();
      expect(res).toEqual({ error: 'user was here' });
    });
  });
});
