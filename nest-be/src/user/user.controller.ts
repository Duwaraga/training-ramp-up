/* eslint-disable prettier/prettier */
import { Controller, Body, Post, Req } from '@nestjs/common';
// import jwt from 'jsonwebtoken';
import { UserService } from './user.service';
import {UserDto} from '../dto/user.dto'
require("dotenv").config();
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() data: UserDto) {
    const res = await this.userService.userRegister(data);
    if (!res) {
      return { error: 'User Register fail' };
    } else return res;
  }

  @Post('signin')
  async signIn(@Req() req) {
    const userDetails = req.query;

    try {
      const  user  = await this.userService.loginUser(userDetails);
      if (!user) {
        console.log('User Not here');
        return {error: 'User Not here'}
      } else {
       
        // user['accessToken'] = jwt.sign(
        //   { user: user.ID, role: user.role },
        //   process.env.ACCESS_TOKEN_KEY,
        // );
        console.log('UserDetails', user);
        return user;
      }
    } catch (error) {
      console.log('login controller error', error);
    }
  }
}
