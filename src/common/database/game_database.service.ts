import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { RedisService } from '../../cache/redis.service';

import { 
    bt_server_info_table,
    g11_potential_table,
    g12_reward_table,
    g13_levelmanager_table,
    g14_character_table,
    g15_skill_table,
    g16_guideinfo_table,
    g18_bubbleinfo_table,
    g19_instanceitem_table,
    g20_episodemanager_table,
    g21_episodelist_table,
    g22_item_table,
    g23_gather_contents_info_table,
    g24_gather_contents_list_table,
    g25_event_login_bonus_table,
    g26_continue_table,
    g27_region_table,
    g28_bubble_collection_list_table,
    g29_rank_table,
    g30_collection_list_table,
    g31_collection_info_table,
    g32_random_reward_table,
    g34_levelquest_table,
    g90_option_table,
    g91_soundtable_table,
    g92_stringtable_table,
    g93_tutorialtable_table,
    g94_shop_product_info_table,
    g95_shop_item_table,
    g96_event_schedule_table,
    g97_openlevel_table,
  } from './game/';

@Injectable()
export class GameDatabaseService {
    constructor(
        // Game Table
        private readonly redisService: RedisService,
        private readonly bt_server_info_table: bt_server_info_table,
        private readonly g11_potential_table: g11_potential_table,
        private readonly g12_reward_table: g12_reward_table,
        private readonly g13_levelmanager_table: g13_levelmanager_table,
        private readonly g14_character_table: g14_character_table,
        private readonly g15_skill_table: g15_skill_table,
        private readonly g16_guideinfo_table: g16_guideinfo_table,
        private readonly g18_bubbleinfo_table: g18_bubbleinfo_table,
        private readonly g19_instanceitem_table: g19_instanceitem_table,
        private readonly g20_episodemanager_table: g20_episodemanager_table,
        private readonly g21_episodelist_table: g21_episodelist_table,
        private readonly g22_item_table: g22_item_table,
        private readonly g23_gather_contents_info_table: g23_gather_contents_info_table,
        private readonly g24_gather_contents_list_table: g24_gather_contents_list_table,
        private readonly g25_event_login_bonus_table: g25_event_login_bonus_table,
        private readonly g26_continue_table: g26_continue_table,
        private readonly g27_region_table: g27_region_table,
        private readonly g28_bubble_collection_list_table: g28_bubble_collection_list_table,
        private readonly g29_rank_table: g29_rank_table,
        private readonly g30_collection_list_table: g30_collection_list_table,
        private readonly g31_collection_info_table: g31_collection_info_table,
        private readonly g32_random_reward_table: g32_random_reward_table,
        private readonly g34_levelquest_table: g34_levelquest_table,
        private readonly g90_option_table: g90_option_table,
        private readonly g91_soundtable_table: g91_soundtable_table,
        private readonly g92_stringtable_table: g92_stringtable_table,
        private readonly g93_tutorialtable_table: g93_tutorialtable_table,
        private readonly g94_shop_product_info_table: g94_shop_product_info_table,
        private readonly g95_shop_item_table: g95_shop_item_table,
        private readonly g96_event_schedule_table: g96_event_schedule_table,
        private readonly g97_openlevel_table: g97_openlevel_table,
        // Game Table End
    ) {}
  
    async get_server_info(where_params) {
        return await this.bt_server_info_table.get_server_info(where_params);
    }

    async getGameData() {
        let ret_data = Object();
        // 비동기 Game Data 가져오기
        [
            ret_data.g11_potential,
            ret_data.g12_reward,
            ret_data.g13_levelmanager,
            ret_data.g14_character,
            ret_data.g15_skill,
            ret_data.g16_guideinfo,
            ret_data.g18_bubbleinfo,
            ret_data.g19_instanceitem,
            ret_data.g20_episodemanager,
            ret_data.g21_episodelist,
            ret_data.g22_item,
            ret_data.g23_gather_contents_info,
            ret_data.g24_gather_contents_list,
            ret_data.g25_event_login_bonus,
            ret_data.g26_continue,
            ret_data.g27_region,
            ret_data.g28_bubble_collection_list,
            ret_data.g29_rank,
            ret_data.g30_collection_list,
            ret_data.g31_collection_info,
            ret_data.g32_random_reward,
            ret_data.g34_levelquest,
            ret_data.g90_option,
            ret_data.g91_soundtable,
            ret_data.g92_stringtable,
            ret_data.g93_tutorialtable,
            ret_data.g94_shop_product_info,
            ret_data.g95_shop_item,
            ret_data.g96_event_schedule,
            ret_data.g97_openlevel,
        ] = await Promise.all([
            this.g11_potential_table.get_lists(),
            this.g12_reward_table.get_lists(),
            this.g13_levelmanager_table.get_lists(),
            this.g14_character_table.get_lists(),
            this.g15_skill_table.get_lists(),
            this.g16_guideinfo_table.get_lists(),
            this.g18_bubbleinfo_table.get_lists(),
            this.g19_instanceitem_table.get_lists(),
            this.g20_episodemanager_table.get_lists(),
            this.g21_episodelist_table.get_lists(),
            this.g22_item_table.get_lists(),
            this.g23_gather_contents_info_table.get_lists(),
            this.g24_gather_contents_list_table.get_lists(),
            this.g25_event_login_bonus_table.get_lists(),
            this.g26_continue_table.get_lists(),
            this.g27_region_table.get_lists(),
            this.g28_bubble_collection_list_table.get_lists(),
            this.g29_rank_table.get_lists(),
            this.g30_collection_list_table.get_lists(),
            this.g31_collection_info_table.get_lists(),
            this.g32_random_reward_table.get_lists(),
            this.g34_levelquest_table.get_lists(),
            this.g90_option_table.get_lists(),
            this.g91_soundtable_table.get_lists(),
            this.g92_stringtable_table.get_lists(),
            this.g93_tutorialtable_table.get_lists(),
            this.g94_shop_product_info_table.get_lists(),
            this.g95_shop_item_table.get_lists(),
            this.g96_event_schedule_table.get_lists(),
            this.g97_openlevel_table.get_lists(),
        ]);

        return ret_data;
    }

    async getGameLists(table_name: string) {
        let key = "game:table:" + table_name;
        let gameLists = await this.redisService.get(key);
        let cache_data = Object();
        let cache_data2 = Object();

        if(gameLists === null || Object.keys(gameLists).length == 0){
            gameLists = await this[table_name + '_table'].get_lists();
            //console.log(gameLists);

            let prev_group_id = "";
            Object.entries(gameLists).forEach(async ([key, value], index) => {
                if(table_name == 'g90_option'){
                    cache_data[value['Key_Name']] = value;

                }else if(table_name == 'g32_random_reward'){
                    if(prev_group_id != value['Group_Id']){
                        cache_data[value['Group_Id']] = {};
                        prev_group_id = value['Group_Id'];
                    }
                    cache_data[value['Group_Id']][value['Id']] = value;

                }else if(table_name == 'g23_gather_contents_info'){
                    cache_data[value['Start_Dayweek']] = value;

                }else if(table_name == 'g24_gather_contents_list'){
                    if(prev_group_id != value['Group_No']){
                        cache_data[value['Group_No']] = {};
                        prev_group_id = value['Group_No'];
                    }
                    cache_data[value['Group_No']][value['Order_No']] = value;
                    
                }else if(table_name == 'g25_event_login_bonus'){
                    cache_data[value['Day']] = value;
                }else if(table_name == 'g94_shop_product_info'){
                    if(prev_group_id != value['Group_No']){
                        cache_data[value['Group_No']] = [];
                        prev_group_id = value['Group_No'];
                    }
                    cache_data[value['Group_No']].push(value);
                }else if(table_name == 'g95_shop_item'){
                    if(prev_group_id != value['Product_Id']){
                        cache_data[value['Product_Id']] = [];
                        prev_group_id = value['Product_Id'];
                    }
                    cache_data[value['Product_Id']].push(value);
                }else{
                    cache_data[value['Id']] = value;
                }
            });

            await this.redisService.set(key, cache_data);
        }else{
            cache_data = gameLists;
        }

        return cache_data;
    }

    async getGameListsDetail(table_name: string, cache_field: string, cache_key: string) {
        let get_key = "game:table_detail:" + table_name + ":" + cache_key;
        let key = "";
        let gameLists = await this.redisService.get(get_key);
        let cache_data = [];

        if(gameLists === null || Object.keys(gameLists).length == 0){
            gameLists = await this[table_name + '_table'].get_lists();

            let prev_group_id = "";
            for await (const table_data of gameLists){
                if(prev_group_id != table_data[cache_field]){
                    if(prev_group_id != ""){
                        await this.redisService.set(key, cache_data);
                    }

                    prev_group_id = table_data[cache_field];
                    cache_data = [];
                }
                cache_data.push(table_data);
                key = "game:table_detail:" + table_name + ":" + prev_group_id;
            }

            await this.redisService.set(key, cache_data);
            cache_data = await this.redisService.get(get_key);
        }else{
            cache_data = gameLists;
        }

        return cache_data;
    }
}