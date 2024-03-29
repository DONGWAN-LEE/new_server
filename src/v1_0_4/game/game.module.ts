import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RedisModule } from '../../cache/redis.module';
import { RedisService } from '../../cache/redis.service';

import { GameDatabaseModule } from '../../common/database/game_database.module';
import { GameDatabaseService } from '../../common/database/game_database.service';

//import { CommonResponse } from '../../common/dataReturn/common.Response'
// Game Table
import { 
  bt_server_info,
  g11_potential,
  g12_reward,
  g13_levelmanager,
  g14_character,
  g15_skill,
  g16_guideinfo,
  g18_bubbleinfo,
  g19_instanceitem,
  g20_episodemanager,
  g21_episodelist,
  g22_item,
  g23_gather_contents_info,
  g24_gather_contents_list,
  g25_event_login_bonus,
  g26_continue,
  g27_region,
  g28_bubble_collection_list,
  g29_rank,
  g30_collection_list,
  g31_collection_info,
  g32_random_reward,
  g34_levelquest,
  g90_option,
  g91_soundtable,
  g92_stringtable,
  g93_tutorialtable,
  g94_shop_product_info,
  g95_shop_item,
  g96_event_schedule,
  g97_openlevel,
} from '../../common/entities/game/';

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
} from '../../common/database/game/';

// Table End
@Module({
  imports: [
    TypeOrmModule.forFeature([
      bt_server_info,
      g11_potential,
      g12_reward,
      g13_levelmanager,
      g14_character,
      g15_skill,
      g16_guideinfo,
      g18_bubbleinfo,
      g19_instanceitem,
      g20_episodemanager,
      g21_episodelist,
      g22_item,
      g23_gather_contents_info,
      g24_gather_contents_list,
      g25_event_login_bonus,
      g26_continue,
      g27_region,
      g28_bubble_collection_list,
      g29_rank,
      g30_collection_list,
      g31_collection_info,
      g32_random_reward,
      g34_levelquest,
      g90_option,
      g91_soundtable,
      g92_stringtable,
      g93_tutorialtable,
      g94_shop_product_info,
      g95_shop_item,
      g96_event_schedule,
      g97_openlevel,
    ]),
    RedisModule,
    GameDatabaseModule
  ],
  controllers: [GameController],
  providers: [
    GameService, 
    RedisService,
    GameDatabaseService,
    
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
  ],
})

export class GameV1_0_4Module {}
