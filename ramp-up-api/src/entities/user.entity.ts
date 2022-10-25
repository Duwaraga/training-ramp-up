import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  User: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  role: string;
}
