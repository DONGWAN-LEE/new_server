import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g25_event_login_bonus } from '../../entities/game/g25_event_login_bonus.entity';

@Injectable()
export class g25_event_login_bonus_table {
    constructor(
        @InjectRepository(g25_event_login_bonus)
        private repository: Repository<g25_event_login_bonus>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g25_event_login_bonus[]> {
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