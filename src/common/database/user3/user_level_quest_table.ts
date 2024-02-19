import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, In, QueryRunner, Repository, MoreThanOrEqual} from 'typeorm';
import { user_level_quest } from '../../entities/user/user_level_quest.entity';

@Injectable()
export class user3_level_quest_table {
    /*constructor(private readonly dataSource: DataSource) {
        
    }*/
    constructor(
        @InjectRepository(user_level_quest, 'user3DB')
        private repository: Repository<user_level_quest>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<user_level_quest[]> {
        return this.repository.find();
    }

    async add(add_param: Object) {
        return this.repository.save(add_param);
    }

    async set(where_obj: Object, update_param: Object) {
        return this.repository.update(where_obj, update_param);
    }

    async get(where_params: Object) : Promise<user_level_quest[]> {
        return await this.repository.find({
            where: where_params
            // skip: 0,
            // take: 1,
        })
    }

    async field_get(field_params: Object, where_params: Object) : Promise<user_level_quest[]> {
        return await this.repository.find({
            select: field_params,
            where: where_params
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