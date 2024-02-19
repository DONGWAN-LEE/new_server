import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g23_gather_contents_info } from '../../entities/game/g23_gather_contents_info.entity';

@Injectable()
export class g23_gather_contents_info_table {
    constructor(
        @InjectRepository(g23_gather_contents_info)
        private repository: Repository<g23_gather_contents_info>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g23_gather_contents_info[]> {
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