import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g19_instanceitem } from '../../entities/game/g19_instanceitem.entity';

@Injectable()
export class g19_instanceitem_table {
    constructor(
        @InjectRepository(g19_instanceitem)
        private repository: Repository<g19_instanceitem>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g19_instanceitem[]> {
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