// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()
export class g24_gather_contents_list{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Group_No:number;

    @Column()
    Order_No:number;

    @Column()
    Reward_Id:number;

    @Column()
    Target_Value:number;
    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
    */
}