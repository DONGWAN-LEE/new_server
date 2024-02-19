import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g15_skill } from '../../entities/game/g15_skill.entity';

@Injectable()
export class g15_skill_table {
    constructor(
        @InjectRepository(g15_skill)
        private repository: Repository<g15_skill>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g15_skill[]> {
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