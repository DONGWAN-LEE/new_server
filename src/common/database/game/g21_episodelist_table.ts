import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g21_episodelist } from '../../entities/game/g21_episodelist.entity';

@Injectable()
export class g21_episodelist_table {
    constructor(
        @InjectRepository(g21_episodelist)
        private repository: Repository<g21_episodelist>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g21_episodelist[]> {
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