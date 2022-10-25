/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class StudentDto {

  @IsString()
  @IsNotEmpty()
  studentName: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsInt()
  @IsNotEmpty()
  mobileNo: string;

  @IsInt()
  @IsNotEmpty()
  age: string;

  @IsNotEmpty()
  dob: Date;
}