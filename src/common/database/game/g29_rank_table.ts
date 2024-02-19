import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g29_rank } from '../../entities/game/g29_rank.entity';

@Injectable()
export class g29_rank_table {
    constructor(
        @InjectRepository(g29_rank)
        private repository: Repository<g29_rank>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g29_rank[]> {
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