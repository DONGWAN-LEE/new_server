import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g34_levelquest } from '../../entities/game/g34_levelquest.entity';

@Injectable()
export class g34_levelquest_table {
    constructor(
        @InjectRepository(g34_levelquest)
        private repository: Repository<g34_levelquest>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g34_levelquest[]> {
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