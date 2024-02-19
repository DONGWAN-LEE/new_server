import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g93_tutorialtable } from '../../entities/game/g93_tutorialtable.entity';

@Injectable()
export class g93_tutorialtable_table {
    constructor(
        @InjectRepository(g93_tutorialtable)
        private repository: Repository<g93_tutorialtable>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g93_tutorialtable[]> {
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