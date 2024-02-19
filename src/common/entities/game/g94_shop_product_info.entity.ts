// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()

export class g94_shop_product_info{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Group_No:number;

    @Column()
    Group_Sort:number;

    @Column()
    Entry_No:number;

    @Column()
    Continuity_No:number;

    @Column()
    Group_Name:number;

    
    @Column()
    Status:number;

    @Column()
    Product_Id_Normal:number;

    
    @Column()
    Product_Id_First:number;

    @Column()
    Product_Name:number;

    @Column()
    Product_Img:string;

    @Column()
    Product_Info:number;

    @Column()
    Product_Acount_Value:number;

    @Column()
    Product_Id_Ios:string;

    @Column()
    Product_Id_Aos:string;

    @Column()
    Label:string;

    @Column()
    Price_Type:string;

    @Column()
    Real_Price:number;

    @Column()
    Display_Sale:string;

    @Column()
    Sale_Start:string;

    @Column()
    Sale_End:string;

    @Column()
    Period_Display:number;
    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
    */
}