import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g31_collection_info } from '../../entities/game/g31_collection_info.entity';

@Injectable()
export class g31_collection_info_table {
    constructor(
        @InjectRepository(g31_collection_info)
        private repository: Repository<g31_collection_info>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g31_collection_info[]> {
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