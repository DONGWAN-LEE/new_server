// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()
export class g29_rank{
    @PrimaryGeneratedColumn()
    Id:number;
    
    @Column()
    Rank_Name:string;

    @Column()
    Basic_Scroe:number;

    @Column()
    Change_Turn_Min:number;

    @Column()
    Change_Turn_Max:number;

    @Column()
    Change_Score_Min:number;

    @Column()
    Change_Score_Max:number;
    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
    */
}