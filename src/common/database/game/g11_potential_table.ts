import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository} from 'typeorm';
import { g11_potential } from '../../entities/game/g11_potential.entity';

@Injectable()
export class g11_potential_table {
    constructor(
        @InjectRepository(g11_potential)
        private repository: Repository<g11_potential>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g11_potential[]> {
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