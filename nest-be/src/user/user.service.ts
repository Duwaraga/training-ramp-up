/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Users } from '../entity/user.entity';
// import { Repository } from 'typeorm';
// import jwt from 'jsonwebtoken';
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// @Injectable()
// export class UserService {
//   constructor(
//     @InjectRepository(Users)
//     private readonly userRepository: Repository<Users>,
//   ) {}
//   async userRegister(details) {
//     try {
//       const checkUser = await this.userRepository.findOneBy({
//         email: details.email,
//       });

//       if (checkUser == null) {
//         const salt = bcrypt.genSaltSync(saltRounds);
//         const hash = bcrypt.hashSync(details.password, salt);

//         const { User, email } = details;
//         const user = await this.userRepository.save({
//           User: User,
//           email: email,
//           password: hash,
//           role: 'User',
//         });

//         return user;
//       } else {
//         return { error: 'user was here' };
//       }
//     } catch (error) {
//       console.log('Register Error', error);
//     }
//   }

//   async loginUser(details: any) {
//     try {
//       const user = await this.userRepository.findOneBy({
//         email: details.email,
//       });

//       if (!user) {
//         console.log('User not found');
//       } else {
//         const value = await bcrypt.compare(details.password, user.password);

//         if (!value) {
//           console.log('Password not match');
//         } else {
         
//           return { user };
//         }
//       }
//     } catch (error) {
//       return { error: 'login service Error' };
//     }
//   }
// }


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../dto/user.dto';
import { Users } from '../entity/user.entity';
import { Repository } from 'typeorm';
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';
const saltRounds = 10;
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}
  async userRegister(details: UserDto) {
    try {
      const checkUser = await this.userRepository.findOneBy({
        email: details.email,
      });
      if (checkUser == null) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = await bcrypt.hashSync(details.password, salt);
        const { User , email } = details;
        const user = await this.userRepository.save({
          User: User,
          email: email,
          password: hash,
          role: 'User',
        });
        return user;
      } else {
        return { error: 'user was here' };
      }
    } catch (error) {
      console.log('Register Error', error);
    }
  }

  async loginUser(details: any) {
  
    try {
      const user = await this.userRepository.findOneBy({
        email: details.email,
      });
   
      if (!user) {
        return { error: 'User not found' };
      } else {
        const value = bcrypt.compare(details.password, user.password);
        if (!value) {
          console.log('Password not match');
        } else {
         
          user['accessToken'] = await jwt.sign(
            { user: user.ID, role: user.role },
            process.env.ACCESS_TOKEN_KEY,
          );
          console.log("DETAILS" , user);
          return  user ;
        }
      }
    } catch (error) {
      return { error: 'login service Error' };
    }
  }
}
