import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g12_reward } from '../../entities/game/g12_reward.entity';

@Injectable()
export class g12_reward_table {
    constructor(
        @InjectRepository(g12_reward)
        private repository: Repository<g12_reward>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g12_reward[]> {
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