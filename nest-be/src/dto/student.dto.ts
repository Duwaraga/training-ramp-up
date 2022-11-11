/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class StudentDto {

  @IsInt()
  @IsNotEmpty()
  ID: number;

  @IsString()
  @IsNotEmpty()
  studentName: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  mobileNo: string;

  @IsInt()
  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  dob: Date;
}