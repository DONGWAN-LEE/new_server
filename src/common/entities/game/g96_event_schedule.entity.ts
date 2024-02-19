// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()

export class g96_event_schedule{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Use_This:string;

    @Column()
    Event_Type:string;

    @Column()
    Week:string;

    @Column()
    Event_ID:number;
    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
    */
}