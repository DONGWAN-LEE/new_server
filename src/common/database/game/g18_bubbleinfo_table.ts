import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g18_bubbleinfo } from '../../entities/game/g18_bubbleinfo.entity';

@Injectable()
export class g18_bubbleinfo_table {
    constructor(
        @InjectRepository(g18_bubbleinfo)
        private repository: Repository<g18_bubbleinfo>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g18_bubbleinfo[]> {
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