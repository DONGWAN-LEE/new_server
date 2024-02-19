import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, In, QueryRunner, Repository, MoreThanOrEqual} from 'typeorm';
import { user_gather_contents } from '../../entities/user/user_gather_contents.entity';

@Injectable()
export class user3_gather_contents_table {
    /*constructor(private readonly dataSource: DataSource) {
        
    }*/
    constructor(
        @InjectRepository(user_gather_contents, 'user3DB')
        private repository: Repository<user_gather_contents>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<user_gather_contents[]> {
        return this.repository.find();
    }

    async add(add_param: Object) {
        return this.repository.save(add_param);
    }

    async set(where_obj: Object, update_param: Object) {
        return this.repository.update(where_obj, update_param);
    }

    async get(where_params: Object) : Promise<user_gather_contents[]> {
        return await this.repository.find({
            where: where_params
            // skip: 0,
            // take: 1,
        })
    }

    async field_get(field_params: Object, where_params: Object) : Promise<user_gather_contents[]> {
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