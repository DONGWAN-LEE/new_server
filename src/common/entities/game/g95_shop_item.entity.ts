// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()

export class g95_shop_item{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Product_Id:number;

    @Column()
    Item_Type:string;

    @Column()
    Item_Id:number;

    @Column()
    Item_Count:number;
    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
    */
}