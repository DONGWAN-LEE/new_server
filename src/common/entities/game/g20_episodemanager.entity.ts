 // ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()
export class g20_episodemanager{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Region_No:number;

    @Column()
    Episode_No:number;

    @Column()
    Reward_Condition:number;

    @Column()
    Condition_Value:number;

    @Column()
    Reward_Image:string;

    @Column()
    Reward_Text:number;

    @Column()
    Reward_Item:number;
    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
    */
}