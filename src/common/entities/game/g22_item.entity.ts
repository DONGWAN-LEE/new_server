// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()
export class g22_item{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Sort:number;

    @Column()
    Item_Type:string;

    @Column()
    Item_Name:number;

    @Column()
    Item_Info:number;

    @Column()
    Item_Img:string;

    @Column()
    Potential_Id:number;

    @Column()
    Use_Value:number;

    @Column()
    Use_Time:number;

    @Column()
    Use_Sound:number;

    @Column()
    LogType:string;
    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
    */
}
