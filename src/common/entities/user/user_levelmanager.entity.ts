// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { Exclude } from "class-transformer";
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, UpdateDateColumn, PrimaryColumn
} from "typeorm";

@Entity()
export class user_levelmanager{
    @PrimaryColumn()
    Uidx:number;

    @Column()
    Id:number;

    @Column()
    Score:number;

    @Column()
    Grade:number;

    @Column()
    Cnt:number;

    @Column()
    IsStart:number;

    @Column()
    Uptime:number;

    @Column()
    Lastuptime:number;
}
