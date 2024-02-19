// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()
export class g13_levelmanager{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Level_Map_File_Name:string;

    @Column()
    Episode_No:number;

    @Column()
    Order_List:number;

    @Column()
    Reward:number;

    @Column()
    In_Game_Guide_Popup:number;

    @Column()
    Score_Grade1:number;

    @Column()
    Score_Grade2:number;

    @Column()
    Score_Grade3:number;

    @Column()
    Score_Display_Max:number;

    @Column()
    Bgm:number;

    @Column()
    InfinitySkill:number;

    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
    */
}
