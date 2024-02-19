// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()
export class g19_instanceitem{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Combo_Effect_String:number;

    @Column()
    Bubble_Match_Combo_Count:number;

    @Column()
    Add_Score:number;

    @Column()
    Add_Bubble_Id:number;

    @Column()
    Add_Bubble_Value:number;

    @Column()
    Sound:string;
    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
    */
}