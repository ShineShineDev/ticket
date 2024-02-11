import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';
import { IsNotEmpty, IsEmail } from 'class-validator';

@Entity()
export class Permissions {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  @IsNotEmpty({ message: 'Privilege is required' })
  privilege!: string;
}
