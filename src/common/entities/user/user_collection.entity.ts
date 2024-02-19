// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { Exclude } from "class-transformer";
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, UpdateDateColumn, PrimaryColumn
} from "typeorm";

@Entity()
export class user_collection{
    @PrimaryColumn()
    Uidx:number;

    @PrimaryColumn()
    Id:number;

    @Column()
    Cnt:number;
}
