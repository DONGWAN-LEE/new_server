import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g26_continue } from '../../entities/game/g26_continue.entity';

@Injectable()
export class g26_continue_table {
    constructor(
        @InjectRepository(g26_continue)
        private repository: Repository<g26_continue>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g26_continue[]> {
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