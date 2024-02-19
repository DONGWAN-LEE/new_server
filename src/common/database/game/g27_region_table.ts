import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g27_region } from '../../entities/game/g27_region.entity';

@Injectable()
export class g27_region_table {
    constructor(
        @InjectRepository(g27_region)
        private repository: Repository<g27_region>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g27_region[]> {
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