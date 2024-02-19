// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()
export class g18_bubbleinfo{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Bubble_Type:string;

    @Column()
    Path:string;

    @Column()
    Matching_Score:number;

    @Column()
    Drop_Score:number;

    @Column()
    Is_Use_Tool:string;
    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
    */
}