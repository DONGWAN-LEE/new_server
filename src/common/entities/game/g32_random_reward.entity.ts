// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()
export class g32_random_reward{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Group_Id:number;

    @Column()
    Item_Type:string;

    @Column()
    Item_ID:number;

    @Column()
    Percentage:number;

    @Column()
    Count_Value:number;
    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
    */
}