import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, In, QueryRunner, Repository} from 'typeorm';
import { bt_server_info } from '../../entities/game/bt_server_info.entity';

@Injectable()
export class bt_server_info_table {
    /*constructor(private readonly dataSource: DataSource) {
        
    }*/
    constructor(
        @InjectRepository(bt_server_info)
        private repository: Repository<bt_server_info>,
        private readonly dataSource: DataSource
    ) {}

    async get_server_info(where_params: Object) : Promise<bt_server_info[]> {
        return this.repository.find({
            where: {
                flg: 1,
                game_type: In ([where_params[0]]),
                game_ver: where_params[1]
            },
            order: {Id: `DESC`},
            // skip: 0,
            // take: 1,
        })
    }

    //initalize the database
    async init(): Promise<QueryRunner> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        return queryRunner;
    }
}