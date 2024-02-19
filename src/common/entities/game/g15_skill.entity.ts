// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()
export class g15_skill{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Skill_Type:string;

    @Column()
    Icon:string;

    @Column()
    Skill_Name:number;

    @Column()
    Skill_Dest:number;

    @Column()
    Condition_Type:string;

    @Column()
    Condition_Value:number;

    @Column()
    Potential_Id:number;

    @Column()
    LogType:string;

    @Column()
    Use_Sound:number;
    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
    */
}