// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()
export class g27_region{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Region_Name:number;

    @Column()
    Region_Resource:string;

    @Column()
    Select_Region1:number;

    @Column()
    Traffic_Type1:string;

    @Column()
    Select_Region2:number;

    @Column()
    Traffic_Type2:string;

    @Column()
    Select_Region3:number;

    @Column()
    Traffic_Type3:string;

    @Column()
    Select_Region4:number;

    @Column()
    Traffic_Type4:string;
    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
    */
}