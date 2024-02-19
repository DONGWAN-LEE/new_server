// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { Exclude } from "class-transformer";
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, UpdateDateColumn, PrimaryColumn
} from "typeorm";

@Entity()
export class user_login_bonus{
    @PrimaryColumn()
    Uidx:number;

    @Column()
    BonusType:string;

    @Column()
    Day:number;

    @Column()
    ReceiveDay:string;
}
