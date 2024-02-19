import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g30_collection_list } from '../../entities/game/g30_collection_list.entity';

@Injectable()
export class g30_collection_list_table {
    constructor(
        @InjectRepository(g30_collection_list)
        private repository: Repository<g30_collection_list>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g30_collection_list[]> {
        return this.repository.find();
    }

    //initalize the database
    async init(): Promise<QueryRunner> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        return queryRunner;
    }
}