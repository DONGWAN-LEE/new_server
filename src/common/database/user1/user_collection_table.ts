import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, In, QueryRunner, Repository} from 'typeorm';
import { user_collection } from '../../entities/user/user_collection.entity';

@Injectable()
export class user1_collection_table {
    /*constructor(private readonly dataSource: DataSource) {
        
    }*/
    constructor(
        @InjectRepository(user_collection, 'user1DB')
        private repository: Repository<user_collection>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<user_collection[]> {
        return this.repository.find();
    }

    async add(add_param: Object) {
        return this.repository.save(add_param);
    }

    async set(where_obj: Object, update_param: Object) {
        return this.repository.update(where_obj, update_param);
    }

    async get(where_params: Object) : Promise<user_collection[]> {
        return await this.repository.find({
            where: where_params
            // skip: 0,
            // take: 1,
        })
    }

    async field_get(field_params: Object, where_params: Object) : Promise<user_collection[]> {
        return await this.repository.find({
            select: field_params,
            where: where_params
        })
    }

    async getIn(Uidx: number, in_params: Object) : Promise<user_collection[]> {
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