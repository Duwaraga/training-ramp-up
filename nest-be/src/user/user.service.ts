/* eslint-disable prettier/prettier */
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
        const { User, email } = details;
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
          return user;
        }
      }
    } catch (error) {
      return error;
    }
  }
}
