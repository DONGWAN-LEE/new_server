// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()
export class g21_episodelist{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Region_No:number;

    @Column()
    Order_List:number;

    @Column()
    Episode_Name:number;

    @Column()
    Episodeimage_Resource:string;

    @Column()
    Episode_Character:string;

    @Column()
    Episode_UI:string;

    @Column()
    Reward_Id:number;

    @Column()
    Bgm:string;

    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
    */
}