// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()
export class g14_character{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Character_Name:number;

    @Column()
    Character_Data_Path:string;

    @Column()
    skill_1:number;

    @Column()
    skill_2:number;

    @Column()
    skill_3:number;

    @Column()
    skill_4:number;
    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
    */
}