import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';
import { IsNotEmpty, IsEmail } from 'class-validator';

@Entity()
export class User {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column()
    @IsNotEmpty({ message: 'Username is required' })
    username!: string;

    @Column()

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email!: string;

    @Column()
    @IsNotEmpty({ message: 'Password is required' })
    password!: string;

    @Column()
    @IsNotEmpty({ message: 'Role is required' })
    role!: string;
}
