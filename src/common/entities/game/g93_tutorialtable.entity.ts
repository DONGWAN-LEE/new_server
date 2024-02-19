// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()
export class g93_tutorialtable{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Oder:number;

    @Column()
    Use:string;

    @Column()
    tutorialType:string;

    @Column()
    Cut_Scene_Id:number;

    @Column()
    Condition:string;

    @Column()
    Open_Type:string;

    @Column()
    Open_Value:number;

    @Column()
    Reward_Type:string;

    @Column()
    Reward_ID:number;

    @Column()
    Reward_Count:number;
    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
    */
}