// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { Exclude } from "class-transformer";
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, UpdateDateColumn, PrimaryColumn
} from "typeorm";

@Entity()
export class user_game_info{
    @PrimaryColumn()
    Uidx:number;

    @Column()
    Coin:number;

    @Column()
    FreeCoin:number;

    @Column()
    ChargedCoin:number;

    @Column()
    Level:number;

    @Column()
    LevelClearCnt:number;

    @Column()
    IsStart:string;

    @Column()
    Stamina:number;

    @Column()
    StaminaLastChrgeTime:number;
}
