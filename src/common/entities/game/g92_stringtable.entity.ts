// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()
export class g92_stringtable{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Kor:string;

    @Column()
    Eng:string;

    @Column()
    Jpn:string;
    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
    */
}