import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g24_gather_contents_list } from '../../entities/game/g24_gather_contents_list.entity';

@Injectable()
export class g24_gather_contents_list_table {
    constructor(
        @InjectRepository(g24_gather_contents_list)
        private repository: Repository<g24_gather_contents_list>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g24_gather_contents_list[]> {
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