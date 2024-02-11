import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Route {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  @IsNotEmpty({ message: 'Departure Location is required' })
  departureLocation!: string;

  @Column()
  @IsNotEmpty({ message: 'Arrival Location is required' })
  arrivalLocation!: string;

  @Column()
  @IsNotEmpty({ message: 'Departure Time is required' })
  departureTime!: Date;

  @Column()
  @IsNotEmpty({ message: 'Arrival Time is required' })
  arrivalTime!: Date;
}
