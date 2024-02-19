import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g92_stringtable } from '../../entities/game/g92_stringtable.entity';

@Injectable()
export class g92_stringtable_table {
    constructor(
        @InjectRepository(g92_stringtable)
        private repository: Repository<g92_stringtable>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g92_stringtable[]> {
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