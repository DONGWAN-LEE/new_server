// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()
export class g30_collection_list{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Category_Name:number;

    @Column()
    Collection_Reward:number;

    @Column()
    Log_Type:string;
    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
    */
}