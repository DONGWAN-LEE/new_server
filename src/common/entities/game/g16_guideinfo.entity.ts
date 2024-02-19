// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()
export class g16_guideinfo{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Ui_Type:string;

    @Column()
    Show_Type:string;

    @Column()
    Guide_Image:string;

    @Column()
    Guide_Text:number;
    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
    */
}