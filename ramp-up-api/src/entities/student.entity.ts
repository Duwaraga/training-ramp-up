import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  studentName: string;

  @Column()
  gender: string;

  @Column()
  address: string;

  @Column()
  mobileNo: string;

  @Column({ type: "date", nullable: true })
  dob: string;

  @Column()
  age: number;
}
