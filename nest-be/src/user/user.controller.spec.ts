/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDto } from 'src/dto/user.dto';
describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

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
        password: 'abcd',
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
      };

      const user = {
        user: {
          email: 'test@t.com',
          password: 'password',
        },
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
      jest.spyOn(userService, 'loginUser').mockResolvedValueOnce(null);
      const res = await controller.signIn(req);
      expect(res).toEqual({ error: 'User Not here' });
    });
  });
});
