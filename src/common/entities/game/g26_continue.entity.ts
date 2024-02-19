// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()
export class g26_continue{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Older:number;

    @Column()
    Cost:number;

    @Column()
    Info:number;

    @Column()
    Turn:number;

    @Column()
    Skill_Id:number;

    @Column()
    Icon:string;
    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
    */
}