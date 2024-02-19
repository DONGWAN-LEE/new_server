// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { Exclude } from "class-transformer";
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, UpdateDateColumn, PrimaryColumn
} from "typeorm";

@Entity()
export class user_episode_reward{
    @PrimaryColumn()
    Uidx:number;

    @PrimaryColumn()
    EpisodeRwardId:number;

    @Column()
    Episode_No:number;

    @Column()
    Condition_Value:number;
}
