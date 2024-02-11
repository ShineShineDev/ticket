import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';
import { IsNotEmpty, IsEmail } from 'class-validator';

@Entity({ name: 'roles' })
export class Role {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  @IsNotEmpty({ message: 'Role name is required' })
  role!: string;

  @Column('simple-array')
  @IsNotEmpty({ message: 'Permissions are required' })
  permissions!: string[];
}
