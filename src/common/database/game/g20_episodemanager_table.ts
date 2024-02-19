import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g20_episodemanager } from '../../entities/game/g20_episodemanager.entity';

@Injectable()
export class g20_episodemanager_table {
    constructor(
        @InjectRepository(g20_episodemanager)
        private repository: Repository<g20_episodemanager>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g20_episodemanager[]> {
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