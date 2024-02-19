import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RedisService } from '../../cache/redis.service';
import { InitDto } from './dto/game.dto';
import { GameDatabaseService } from '../../common/database/game_database.service';

@Injectable()
export class GameService {
    constructor(
        private readonly redisService: RedisService,
        private readonly gameDatabase: GameDatabaseService,
    ) {}

    async init(initDto: InitDto) {
        let os = initDto.os;
        let type = initDto.type;
        let ver = initDto.ver;

        let ret_data = Object();
        let redis_key = 'game:server_info_' + type + "_" + ver;

        ret_data = await this.redisService.get(redis_key);
        // ret_data = null;

        if(ret_data == null){
            let where_params = [];

            if(type == 'live' || type == 'alpha') {
                where_params.push(['live','alpha']);
            }else{
                where_params.push(['dev']);
            }

            where_params.push(ver);

            let get_server_info_list = {};
            get_server_info_list = await this.gameDatabase.get_server_info(where_params);

            if(Object.keys(get_server_info_list).length === 0){
                // 업데이트
                throw new HttpException(
                    {
                        status : 1000,
                        message : 'Update Required!',
                    },
                    HttpStatus.OK,
                );
            }else{
                ret_data = get_server_info_list;
                await this.redisService.set(redis_key, ret_data);
            }
        }

        if(typeof(ret_data) === 'string'){
            ret_data = JSON.parse(ret_data);
        }

        let is_update = false;

        Object.entries(ret_data).forEach(async ([key, value], index) => {
            if(value['game_type'] == type && value['game_ver'] == ver){
                is_update = true;
            }
        });

        if(is_update == false){
            // 업데이트
            throw new HttpException(
                {
                    status : 1000,
                    message : 'Update Required!',
                },
                HttpStatus.OK,
            );
        }

        let ret = [];
        if(type == 'development' || type == 'dev'){
            Object.entries(ret_data).forEach(async ([key, value], index) => {
                if(value['game_ver'] == ver){
                    ret.push(value);
                }
            });

            ret_data = ret;
        }

        return ret_data;
    }

    async getGameData() {
        try {
            let ret_data = Object();
            let redis_key = 'game:getGameData';
            ret_data = await this.redisService.get(redis_key);
            //ret_data = null;
            if(ret_data == null){
                ret_data = {};
                ret_data = await this.gameDatabase.getGameData();

                await this.redisService.set(redis_key, ret_data);
            }

            return ret_data;
        }catch(e) {
            throw new HttpException(
                {
                    status : 999,
                    message : 'Database Error',
                },
                HttpStatus.FORBIDDEN,
            );
        }
    }
}
