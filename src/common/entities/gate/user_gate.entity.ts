// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { Exclude } from "class-transformer";
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, UpdateDateColumn
} from "typeorm";

@Entity()
export class user_gate{

    @PrimaryGeneratedColumn()
    Uidx:number;

    @Column()
    Uid:string;

    @Column()
    Os:number;

    @Column()
    Nickname:string;

    @Column()
    Acounttype:number;

    @Column()
    Profileurl:string;

    @Column()
    Usn:string;

    @Column()
    Deviceuuid:string;

    @Column()
    Dbnum:number;

    @Column()
    Gmmode:number;

    @Column()
    Withraw:number;

    @Column()
    Pushstatus:number;

    @CreateDateColumn({
        type:'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    public Createtime: Date;
    /*
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;

    // 새로운 Data 생성 예제
    @Expose()
    get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
    */
}
