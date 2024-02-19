import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g32_random_reward } from '../../entities/game/g32_random_reward.entity';

@Injectable()
export class g32_random_reward_table {
    constructor(
        @InjectRepository(g32_random_reward)
        private repository: Repository<g32_random_reward>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g32_random_reward[]> {
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