import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g91_soundtable } from '../../entities/game/g91_soundtable.entity';

@Injectable()
export class g91_soundtable_table {
    constructor(
        @InjectRepository(g91_soundtable)
        private repository: Repository<g91_soundtable>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g91_soundtable[]> {
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