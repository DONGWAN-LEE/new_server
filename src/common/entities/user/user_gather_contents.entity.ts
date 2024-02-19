// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { Exclude } from "class-transformer";
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, UpdateDateColumn, PrimaryColumn
} from "typeorm";

@Entity()
export class user_gather_contents{
    @PrimaryColumn()
    Uidx:number;

    @PrimaryColumn()
    ReceiveWeek:string;

    @Column()
    Total_Target_Value:number;

    @Column()
    Target_Value:number;

    @PrimaryColumn()
    Last_Reward_Date:string;
}
