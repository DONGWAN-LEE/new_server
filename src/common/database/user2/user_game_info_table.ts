import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, In, QueryRunner, Repository} from 'typeorm';
import { user_game_info } from '../../entities/user/user_game_info.entity';

@Injectable()
export class user2_game_info_table {
    /*constructor(private readonly dataSource: DataSource) {
        
    }*/
    constructor(
        @InjectRepository(user_game_info, 'user2DB')
        private repository: Repository<user_game_info>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<user_game_info[]> {
        return this.repository.find();
    }

    async add(add_param: Object) {
        return this.repository.save(add_param);
    }

    async set(where_obj: Object, update_param: Object) {
        return this.repository.update(where_obj, update_param);
    }

    async get(where_params: Object) : Promise<user_game_info[]> {
        return await this.repository.find({
            select: ['Coin', 'Level', 'FreeCoin', 'ChargedCoin', 'LevelClearCnt', 'IsStart','Stamina', 'StaminaLastChrgeTime'],
            where: where_params
            // skip: 0,
            // take: 1,
        })
    }

    async field_get(field_params: Object, where_params: Object) : Promise<user_game_info[]> {
        return await this.repository.find({
            select: field_params,
            where: where_params
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