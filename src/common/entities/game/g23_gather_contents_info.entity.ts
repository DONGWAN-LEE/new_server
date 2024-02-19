// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()
export class g23_gather_contents_info{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Start_Dayweek:string;

    @Column()
    Start_Time:string;

    @Column()
    Count_Time:number;

    @Column()
    Mission_Id:number;

    @Column()
    Mission_Title:number;

    @Column()
    Mission_Popup:string;

    @Column()
    Mission_Text:number;

    @Column()
    Target_Type:string;

    @Column()
    Mission_Target:number;
    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
    */
}