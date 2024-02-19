// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { Exclude } from "class-transformer";
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, UpdateDateColumn, PrimaryColumn
} from "typeorm";

@Entity()
export class user_info{
    @PrimaryColumn()
    Uidx:number;

    @Column()
    Uid:string;

    @Column()
    Usn:string;

    @Column()
    Deviceuuid:string;

    @Column()
    Tutorialstep:string;

    @Column()
    Acounttype:string;

    @CreateDateColumn()
    Joindatetime: Date;

    @Column()
    Country:string;

    @CreateDateColumn()
    Lastlogindatetime: Date;

    @Column()
    Blockflg:number;

    @CreateDateColumn()
    Blockstartdate: Date;

    @CreateDateColumn()
    Blockenddate: Date;

    @Column()
    Blockreason:number;

    @Column()
    Blockmemo:string;

    @Column()
    Withraw:number;
}
