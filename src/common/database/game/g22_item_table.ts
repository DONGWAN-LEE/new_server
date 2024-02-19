import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g22_item } from '../../entities/game/g22_item.entity';

@Injectable()
export class g22_item_table {
    constructor(
        @InjectRepository(g22_item)
        private repository: Repository<g22_item>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g22_item[]> {
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