// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()
export class g31_collection_info{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Group:number;

    @Column()
    Collection_Name:number;

    @Column()
    Collection_Info_Text:number;

    @Column()
    Collection_Grade:number;

    @Column()
    Collection_Image:string;

    @Column()
    Collection_Icon:string;

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