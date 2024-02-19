// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp
} from "typeorm";

@Entity()
export class g12_reward{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Effect_Type:string;
    @Column()
    Reward_Box:string;

    @Column()
    Reward_Type1:string;
    @Column()
    Reward_Value1:number;
    @Column()
    Reward_Count1:number;

    @Column()
    Reward_Type2:string;
    @Column()
    Reward_Value2:number;
    @Column()
    Reward_Count2:number;

    @Column()
    Reward_Type3:string;
    @Column()
    Reward_Value3:number;
    @Column()
    Reward_Count3:number;

    @Column()
    Reward_Type4:string;
    @Column()
    Reward_Value4:number;
    @Column()
    Reward_Count4:number;

    @Column()
    Reward_Type5:string;
    @Column()
    Reward_Value5:number;
    @Column()
    Reward_Count5:number;

    @Column()
    Reward_Type6:string;
    @Column()
    Reward_Value6:number;
    @Column()
    Reward_Count6:number;
    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
    */
}
