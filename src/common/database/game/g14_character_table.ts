import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g14_character } from '../../entities/game/g14_character.entity';

@Injectable()
export class g14_character_table {
    constructor(
        @InjectRepository(g14_character)
        private repository: Repository<g14_character>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g14_character[]> {
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