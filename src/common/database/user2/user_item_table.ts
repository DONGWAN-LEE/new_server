import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, In, QueryRunner, Repository, MoreThanOrEqual} from 'typeorm';
import { user_item } from '../../entities/user/user_item.entity';

@Injectable()
export class user2_item_table {
    /*constructor(private readonly dataSource: DataSource) {
        
    }*/
    constructor(
        @InjectRepository(user_item, 'user2DB')
        private repository: Repository<user_item>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<user_item[]> {
        return this.repository.find();
    }

    async add(add_param: Object) {
        return this.repository.save(add_param);
    }

    async set(where_obj: Object, update_param: Object) {
        return this.repository.update(where_obj, update_param);
    }

    async get(where_params: Object) : Promise<user_item[]> {
        return await this.repository.find({
            select: ['Id', 'Cnt'],
            where: where_params
            // skip: 0,
            // take: 1,
        })
    }

    async field_get(field_params: Object, where_params: Object) : Promise<user_item[]> {
        return await this.repository.find({
            select: field_params,
            where: where_params
        })
    }

    async getIn(Uidx: number, in_params: Object) : Promise<user_item[]> {
        return this.repository.find({
            select: ['Id', 'Cnt'],
            where: {
                Uidx: Uidx,
                Id: In ([in_params])
            },
            order: {Id: `ASC`},
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