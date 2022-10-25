import { Module } from '@nestjs/common';
import { Users } from 'src/entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UserService],
})
export class UserModule {}
