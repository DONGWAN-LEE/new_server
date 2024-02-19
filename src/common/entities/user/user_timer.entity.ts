// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { Exclude } from "class-transformer";
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, UpdateDateColumn, PrimaryColumn
} from "typeorm";

@Entity()
export class user_timer{
    @PrimaryColumn()
    Uidx:number;

    @PrimaryColumn()
    Item_Type:string;

    @Column()
    Use_Value:number;

    @Column()
    EndTime:number;
}
