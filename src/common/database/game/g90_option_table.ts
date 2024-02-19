import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g90_option } from '../../entities/game/g90_option.entity';

@Injectable()
export class g90_option_table {
    constructor(
        @InjectRepository(g90_option)
        private repository: Repository<g90_option>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g90_option[]> {
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