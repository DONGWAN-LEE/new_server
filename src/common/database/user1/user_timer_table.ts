import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, In, QueryRunner, Repository, MoreThanOrEqual} from 'typeorm';
import { user_timer } from '../../entities/user/user_timer.entity';

@Injectable()
export class user1_timer_table {
    /*constructor(private readonly dataSource: DataSource) {
        
    }*/
    constructor(
        @InjectRepository(user_timer, 'user1DB')
        private repository: Repository<user_timer>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<user_timer[]> {
        return this.repository.find();
    }

    async add(add_param: Object) {
        return this.repository.save(add_param);
    }

    async set(where_obj: Object, update_param: Object) {
        return this.repository.update(where_obj, update_param);
    }

    async get(where_params: Object) : Promise<user_timer[]> {
        return await this.repository.find({
            select: ['Item_Type', 'EndTime'],
            where: where_params
            // skip: 0,
            // take: 1,
        })
    }

    async field_get(field_params: Object, where_params: Object) : Promise<user_timer[]> {
        return await this.repository.find({
            select: field_params,
            where: where_params
        })
    }

    async getIn(Uidx: number, in_params: Object) : Promise<user_timer[]> {
        return this.repository.find({
            select: ['Item_Type', 'EndTime'],
            where: {
                Uidx: Uidx,
                Item_Type: In ([in_params])
            }
            // skip: 0,
            // take: 1,
        })
    }

    async getTimer(Uidx: number, Type: string, Time: number) : Promise<user_timer[]> {
        return await this.repository.find({
            select: ['Item_Type', 'Use_Value', 'EndTime'],
            where: {
                Uidx: Uidx,
                Item_Type: Type,
                EndTime: MoreThanOrEqual(Time)
            }
            // skip: 0,
            // take: 1,
        })
    }

    async getTimerList(Uidx: number, Time: number) : Promise<user_timer[]> {
        return await this.repository.find({
            select: ['Item_Type', 'EndTime'],
            where: {
                Uidx: Uidx,
                EndTime: MoreThanOrEqual(Time)
            }
            // skip: 0,
            // take: 1,
        })
    }

    //initalize the database
    async init(): Promise<QueryRunner> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        return queryRunner;
    }
}