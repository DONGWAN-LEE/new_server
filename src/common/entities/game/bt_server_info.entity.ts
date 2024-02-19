// ./src/entities/User.ts
//import { Injectable } from '@nestjs/common';
import { Exclude, instanceToPlain } from "class-transformer";
import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, UpdateDateColumn
} from "typeorm";

@Entity()
export class bt_server_info{

    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    server_name:string;

    @Column()
    game_type:string;

    @Column()
    os:number;

    @Column()
    game_ver:string;

    @Column()
    game_url:string;

    @Column()
    cdn_url:string;

    @CreateDateColumn()
    @Exclude()
    create_time: Date;

    @UpdateDateColumn()
    @Exclude({toPlainOnly: true})
    update_time: Date;

    @Column()
    @Exclude({toPlainOnly: true})
    flg:number;

    @Column()
    @Exclude({toPlainOnly: true})
    memo:string;

    /*
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;

    // 새로운 Data 생성 예제
    @Expose()
    get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
}
    */
}