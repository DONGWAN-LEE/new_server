import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g28_bubble_collection_list } from '../../entities/game/g28_bubble_collection_list.entity';

@Injectable()
export class g28_bubble_collection_list_table {
    constructor(
        @InjectRepository(g28_bubble_collection_list)
        private repository: Repository<g28_bubble_collection_list>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g28_bubble_collection_list[]> {
        return this.repository.find();
    }

    //initalize the database
    async init(): Promise<QueryRunner> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        return queryRunner;
    }
}1