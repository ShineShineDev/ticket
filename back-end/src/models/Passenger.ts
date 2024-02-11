import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class Passenger {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column()
    @IsNotEmpty({ message: 'Name is required' })
    name!: string;


    @Column()
    @IsNotEmpty({ message: 'Phone is required' })
    phone!: string;

    @Column()
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email!: string;
}
