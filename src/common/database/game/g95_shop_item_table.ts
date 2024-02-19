import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g95_shop_item } from '../../entities/game/g95_shop_item.entity';

@Injectable()
export class g95_shop_item_table {
    constructor(
        @InjectRepository(g95_shop_item)
        private repository: Repository<g95_shop_item>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g95_shop_item[]> {
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