import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g96_event_schedule } from '../../entities/game/g96_event_schedule.entity';

@Injectable()
export class g96_event_schedule_table {
    constructor(
        @InjectRepository(g96_event_schedule)
        private repository: Repository<g96_event_schedule>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g96_event_schedule[]> {
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