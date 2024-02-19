import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { RedisService } from '../../cache/redis.service';

import { user_gate_table } from './gate/';

@Injectable()
export class GateDatabaseService {
    constructor(
        // Gate Table
        private readonly user_gate_table: user_gate_table,
        private readonly redisService: RedisService,
        // Gate Table End
    ) {}

    // Cache 가 있으면 가져오고 없으면 생성한다.
    async get_user_gate_cache(Uid: string,Usn: string) {
        const key = "user:user_data:" + Uid;

        let user_data = await this.redisService.get(key);

        if(user_data == null){
            let where_params = [Uid, Usn];
            let get_user_data = await this.user_gate_table.get_user_gate_by_uid_usn(where_params);
            user_data = get_user_data[0];

            await this.redisService.set(key, user_data);
        }

        return user_data;
    }

    async get_user_gate(where_params: Object) {
        return await this.user_gate_table.get_user_gate(where_params);
    }
    
    async add(add_params) {
        return await this.user_gate_table.add(add_params);
    }

    async set(Uidx: number, update_params: Object) {
        return await this.user_gate_table.set(Uidx, update_params);
    }
}