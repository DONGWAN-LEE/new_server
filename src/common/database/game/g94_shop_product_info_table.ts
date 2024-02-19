import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository} from 'typeorm';
import { g94_shop_product_info } from '../../entities/game/g94_shop_product_info.entity';

@Injectable()
export class g94_shop_product_info_table {
    constructor(
        @InjectRepository(g94_shop_product_info)
        private repository: Repository<g94_shop_product_info>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<g94_shop_product_info[]> {
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