// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()
export class g11_potential{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Skill_Use_Type:string;

    @Column()
    Bound_Type:string;

    @Column()
    Skill_Ui_Type:string;

    @Column()
    Skill_Use_Value:number;

    @Column()
    Skill_Use_Count:number;

    @Column()
    Order_List:number;

    @Column()
    Bubble_Info_Id:number;

    @Column()
    Use_Effect:string;
    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
    */
}