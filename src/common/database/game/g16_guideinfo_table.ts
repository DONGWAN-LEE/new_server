import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g16_guideinfo } from '../../entities/game/g16_guideinfo.entity';

@Injectable()
export class g16_guideinfo_table {
    constructor(
        @InjectRepository(g16_guideinfo)
        private repository: Repository<g16_guideinfo>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g16_guideinfo[]> {
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