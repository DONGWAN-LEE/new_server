// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { Exclude } from "class-transformer";
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, UpdateDateColumn, PrimaryColumn
} from "typeorm";

@Entity()
export class user_level_quest{
    @PrimaryColumn()
    Uidx:number;

    @Column()
    LastReceiveDay:string;

    @Column()
    prevLevel:number;

    @Column()
    nowLevel:number;

    @Column()
    Reward1:string;

    @Column()
    Reward2:string;

    @Column()
    Reward3:string;
}
