import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g13_levelmanager } from '../../entities/game/g13_levelmanager.entity';

@Injectable()
export class g13_levelmanager_table {
    constructor(
        @InjectRepository(g13_levelmanager)
        private repository: Repository<g13_levelmanager>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g13_levelmanager[]> {
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