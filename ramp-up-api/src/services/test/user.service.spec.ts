// import { Users } from "../../entities/user.entity";
// const bcrypt = require("bcrypt");
// import {findUser, postUser} from '../user.service';

// describe("User Controller", () => {
//   describe("User Login", () => {
//     const findUserData = {
//       query: {
//         email: "test@gmail.com",
//         password: "testPassword",
//       },
//     };

//     const users = {
//       email: "test@t.com",
//       password: "testPassword",
//       id: 1,
//       role: "User",
//     };

//     test("Login Success", async () => {
//       Users.findOneBy = jest.fn().mockReturnValue(users);
//       const mockHash = jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
//       const res = await findUser(findUserData);
//       expect(res).toEqual(users);
//       mockHash.mockRestore();
//     });

//       test('Login fail', async () => {
//         Users.findOneBy = jest.fn().mockResolvedValue(() => undefined);
//         const mockHash = jest.spyOn(bcrypt, "compare").mockResolvedValue(false);
//         const res = await findUser(findUserData);
//         expect(res).toEqual({error:"user not here"});
//         mockHash.mockRestore();
     
//     });
//   });


//   describe('User Register', () => {
//     const loginData = {
//       User: 'test',
//       email: 'test@t.com',
//       password: 'testPassword',
//     };
//     const userTest = {
//       User: 'test',
//       email: 'test@t@t.com',
//       password: 'test',
//       role: 'User',
//       ID: 1,
//     } as never;

//     // const user = {
//     //   User: 'test',
//     //   password: 'test',
//     //   email: 'test@t.com',
//     //   role: 'User',
//     //   save: jest.fn((x) => x),
//     // };
//     test('Register Success', async () => {
//       Users.save = jest.fn().mockResolvedValue(userTest);
//      // jest.spyOn(User, 'save').mockResolvedValue(userTest);
//       jest.spyOn(bcrypt, 'hashSync').mockResolvedValue(true);
//       const res = await postUser(loginData);
//       expect(res).toEqual(userTest);
//     });

//     test('Register fails', async () => {
//       //Users.findOneBy = jest.fn().mockRejectedValue(null);
//       Users.save = jest.fn().mockResolvedValue(null);
//      // const userSave = jest.spyOn(user, 'save').mockResolvedValue(null);
//       const mockHash = jest.spyOn(bcrypt, 'hashSync').mockResolvedValue(false);
//       const res = await postUser(loginData);
//       expect(res).toEqual(null);
//       mockHash.mockRestore();
//      // userSave.mockRestore();
//     });
//   });



// });
