import { Entity, ObjectIdColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { Bus } from './Bus';

@Entity()
export class Ticket {

    @ObjectIdColumn()
    id!: ObjectId;

    @Column()
    @IsNotEmpty({ message: 'Bus ID is required' })
    busId!: ObjectId;

    @ManyToOne(() => Bus, bus => bus.tickets)
    @JoinColumn({ name: 'busId', referencedColumnName: 'id' })
    bus!: Bus;

    @Column()
    @IsNotEmpty({ message: 'Route ID is required' })
    routeId!: ObjectId;

    @Column()
    @IsNotEmpty({ message: 'Passenger ID is required' })
    passengerId!: ObjectId;

    @Column()
    @IsNotEmpty({ message: 'Seat Number is required' })
    seatNumber!: string;

    @Column()
    @IsNotEmpty({ message: 'Departure Date is required' })
    departureDate!: Date;

    @Column()
    @IsNotEmpty({ message: 'Price is required' })
    price!: number;

    @Column()
    // @IsNotEmpty({ message: 'Status is required' })
    status!: string;

    @Column()
    reviewMessage?: any;

    @Column()
    details?: {
        // Additional details about the ticket
    };
}    
