import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { 
    user0_info_table,
    user0_game_info_table,
    user0_levelmanager_table,
    user0_item_table,
    user0_collection_table,
    user0_timer_table,
    user0_login_bonus_table,
    user0_gather_contents_table,
    user0_episode_reward_table,
    user0_level_quest_table,
  } from './user0/';
  
  import { 
    user1_info_table,
    user1_game_info_table,
    user1_levelmanager_table,
    user1_item_table,
    user1_collection_table,
    user1_timer_table,
    user1_login_bonus_table,
    user1_gather_contents_table,
    user1_episode_reward_table,
    user1_level_quest_table,
  } from './user1/';
  
  import { 
    user2_info_table,
    user2_game_info_table,
    user2_levelmanager_table,
    user2_item_table,
    user2_collection_table,
    user2_timer_table,
    user2_login_bonus_table,
    user2_gather_contents_table,
    user2_episode_reward_table,
    user2_level_quest_table,
  } from './user2/';
  
  import { 
    user3_info_table,
    user3_game_info_table,
    user3_levelmanager_table,
    user3_item_table,
    user3_collection_table,
    user3_timer_table,
    user3_login_bonus_table,
    user3_gather_contents_table,
    user3_episode_reward_table,
    user3_level_quest_table,
  } from './user3/';

@Injectable()
export class UserDatabaseService {
    constructor(
        // User Table
        private readonly user0_info_table: user0_info_table,
        private readonly user1_info_table: user1_info_table,
        private readonly user2_info_table: user2_info_table,
        private readonly user3_info_table: user3_info_table,
        
        private readonly user0_game_info_table: user0_game_info_table,
        private readonly user1_game_info_table: user1_game_info_table,
        private readonly user2_game_info_table: user2_game_info_table,
        private readonly user3_game_info_table: user3_game_info_table,

        private readonly user0_levelmanager_table: user0_levelmanager_table,
        private readonly user1_levelmanager_table: user1_levelmanager_table,
        private readonly user2_levelmanager_table: user2_levelmanager_table,
        private readonly user3_levelmanager_table: user3_levelmanager_table,

        private readonly user0_item_table: user0_item_table,
        private readonly user1_item_table: user1_item_table,
        private readonly user2_item_table: user2_item_table,
        private readonly user3_item_table: user3_item_table,

        private readonly user0_collection_table: user0_collection_table,
        private readonly user1_collection_table: user1_collection_table,
        private readonly user2_collection_table: user2_collection_table,
        private readonly user3_collection_table: user3_collection_table,

        private readonly user0_timer_table: user0_timer_table,
        private readonly user1_timer_table: user1_timer_table,
        private readonly user2_timer_table: user2_timer_table,
        private readonly user3_timer_table: user3_timer_table,
        
        private readonly user0_login_bonus_table: user0_login_bonus_table,
        private readonly user1_login_bonus_table: user1_login_bonus_table,
        private readonly user2_login_bonus_table: user2_login_bonus_table,
        private readonly user3_login_bonus_table: user3_login_bonus_table,
        
        private readonly user0_gather_contents_table: user0_gather_contents_table,
        private readonly user1_gather_contents_table: user1_gather_contents_table,
        private readonly user2_gather_contents_table: user2_gather_contents_table,
        private readonly user3_gather_contents_table: user3_gather_contents_table,

        private readonly user0_episode_reward_table: user0_episode_reward_table,
        private readonly user1_episode_reward_table: user1_episode_reward_table,
        private readonly user2_episode_reward_table: user2_episode_reward_table,
        private readonly user3_episode_reward_table: user3_episode_reward_table,

        private readonly user0_level_quest_table: user0_level_quest_table,
        private readonly user1_level_quest_table: user1_level_quest_table,
        private readonly user2_level_quest_table: user2_level_quest_table,
        private readonly user3_level_quest_table: user3_level_quest_table,
        
        // User Table End
    ) {}

    // 샤딩된 Class 의 이름을 자동 생성.
    async getShardingDatabaseTable(table_name: string, Dbnum: number){
        let table_split = table_name.split("_");
        let database_table_name;
        
        for(let i in table_split){
            if(i == "0"){
                database_table_name = table_split[i] + Dbnum;
            }else{
                database_table_name += "_" + table_split[i];
            }
        }
        database_table_name += "_table";

        return database_table_name;
    }

    async add(table_name: string, Dbnum: number, add_params: Object) {
        const sharding_table_name = await this.getShardingDatabaseTable(table_name, Dbnum);
        await this[sharding_table_name].add(add_params);
    }

    async set(table_name: string, Dbnum: number, where_obj: Object, update_params: Object) {
        const sharding_table_name = await this.getShardingDatabaseTable(table_name, Dbnum);

        await this[sharding_table_name].set(where_obj, update_params);
    }

    async get(table_name: string, Dbnum: number, where_obj: Object) {
        const sharding_table_name = await this.getShardingDatabaseTable(table_name, Dbnum);

        return await this[sharding_table_name].get(where_obj);
    }

    async fieldGet(table_name: string, Dbnum: number, field_obj: Object, where_obj: Object) {
        const sharding_table_name = await this.getShardingDatabaseTable(table_name, Dbnum);

        return await this[sharding_table_name].field_get(field_obj, where_obj);
    }

    async getTimer(table_name: string, Dbnum: number, Uidx: number, Type:string, Time: number) {
        const sharding_table_name = await this.getShardingDatabaseTable(table_name, Dbnum);

        return await this[sharding_table_name].getTimer(Uidx, Type, Time);
    }

    async getTimerList(table_name: string, Dbnum: number, Uidx: number, Time: number) {
        const sharding_table_name = await this.getShardingDatabaseTable(table_name, Dbnum);

        return await this[sharding_table_name].getTimerList(Uidx, Time);
    }

    async getIn(table_name: string, Dbnum: number, Uidx: number, in_params: Object) {
        const sharding_table_name = await this.getShardingDatabaseTable(table_name, Dbnum);

        return await this[sharding_table_name].getIn(Uidx, in_params);
    }
    
    async updateItem(Dbnum:number, Uidx: number, Id:number, cnt: number) {
        const sharding_table_name = await this.getShardingDatabaseTable('user_item', Dbnum);

        let user_item = await this[sharding_table_name].get({"Uidx": Uidx, "Id": Id});

        if(cnt < 0){
            // 아이템이 없을 경우
            if(Object.keys(user_item).length == 0 || user_item[0]['Cnt'] == 0){
                throw new HttpException(
                    {
                        status : 33,
                        message : 'Not enough Item.',
                    },
                    HttpStatus.NOT_MODIFIED,
                );
            }
        }else{

        }
        console.log(user_item);
    }

    async getCount(table_name: string, Dbnum:number, where_obj: Object) {
        const sharding_table_name = await this.getShardingDatabaseTable(table_name, Dbnum);
        return await this[sharding_table_name].getCount(where_obj);
    }
}