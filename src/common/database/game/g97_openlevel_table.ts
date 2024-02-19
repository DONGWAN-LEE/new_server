import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g97_openlevel } from '../../entities/game/g97_openlevel.entity';

@Injectable()
export class g97_openlevel_table {
    constructor(
        @InjectRepository(g97_openlevel)
        private repository: Repository<g97_openlevel>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g97_openlevel[]> {
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