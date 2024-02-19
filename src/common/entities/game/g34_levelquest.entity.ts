// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()
export class g34_levelquest{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Level_Title_ID:number;

    @Column()
    Start_Time:string;

    @Column()
    End_Time:string;

    @Column()
    Join_Lv_Min:number;

    @Column()
    Join_Lv_Max:number;

    @Column()
    Target_Value_1:number;
    @Column()
    Target_Value_2:number;
    @Column()
    Target_Value_3:number;

    @Column()
    Reward_ID_1:number;
    @Column()
    Reward_ID_2:number;
    @Column()
    Reward_ID_3:number;
    
    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
    */
}