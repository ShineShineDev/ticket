import { Entity, ObjectIdColumn, Column, OneToMany } from 'typeorm';
import { ObjectId } from 'mongodb';
import { IsNotEmpty } from 'class-validator';
import { Ticket } from './Ticket';

@Entity()
export class Bus {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  @IsNotEmpty({ message: 'Bus Number is required' })
  busNumber!: string;

  @OneToMany(() => Ticket, ticket => ticket.busId)
  tickets!: Ticket[];


  @Column()
  @IsNotEmpty({ message: 'Capacity is required' })
  capacity!: number;

  @Column()
  details?: {
    // Additional details about the bus
  };

}
