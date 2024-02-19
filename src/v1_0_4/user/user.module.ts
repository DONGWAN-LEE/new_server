import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CommonModule } from '../../common/src/common.module';
import { CommonService } from '../../common/src/common.service';

import { GameDatabaseModule } from '../../common/database/game_database.module';
import { GameDatabaseService } from '../../common/database/game_database.service';

import { GateDatabaseModule } from '../../common/database/gate_database.module';
import { GateDatabaseService } from '../../common/database/gate_database.service';

import { UserDatabaseModule } from '../../common/database/user_database.module';
import { UserDatabaseService } from '../../common/database/user_database.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '../../cache/redis.module';
import { RedisService } from '../../cache/redis.service';

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
// Game Table End

import { user_gate } from '../../common/entities/gate/';
import { user_gate_table } from '../../common/database/gate/';

// User Table
import { 
  user_info,
  user_game_info,
  user_levelmanager,
  user_item,
  user_collection,
  user_timer,
  user_login_bonus,
  user_gather_contents,
  user_episode_reward,
  user_level_quest,
} from '../../common/entities/user/';

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
} from '../../common/database/user0/';

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
} from '../../common/database/user1/';

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
} from '../../common/database/user2/';

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
} from'../../common/database/user3/';

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
    TypeOrmModule.forFeature([
      user_gate,
    ], 'gateDB'),
    // user_info Table
    TypeOrmModule.forFeature([
      user_info,
      user_game_info,
      user_levelmanager,
      user_item,
      user_collection,
      user_timer,
      user_login_bonus,
      user_gather_contents,
      user_episode_reward,
      user_level_quest,
    ], 'user0DB'),
    TypeOrmModule.forFeature([
      user_info,
      user_game_info,
      user_levelmanager,
      user_item,
      user_collection,
      user_timer,
      user_login_bonus,
      user_gather_contents,
      user_episode_reward,
      user_level_quest,
    ], 'user1DB'),
    TypeOrmModule.forFeature([
      user_info,
      user_game_info,
      user_levelmanager,
      user_item,
      user_collection,
      user_timer,
      user_login_bonus,
      user_gather_contents,
      user_episode_reward,
      user_level_quest,
    ], 'user2DB'),
    TypeOrmModule.forFeature([
      user_info,
      user_game_info,
      user_levelmanager,
      user_item,
      user_collection,
      user_timer,
      user_login_bonus,
      user_gather_contents,
      user_episode_reward,
      user_level_quest,
    ], 'user3DB'),
    RedisModule,
    CommonModule,
    GameDatabaseModule,
    GateDatabaseModule,
    UserDatabaseModule,
  ],
  controllers: [UserController],
  providers: [
    UserService, 
    RedisService,
    CommonService,
    GameDatabaseService,
    GateDatabaseService,
    UserDatabaseService,

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

    user_gate_table,

    user0_info_table,
    user1_info_table,
    user2_info_table,
    user3_info_table,

    user0_game_info_table,
    user1_game_info_table,
    user2_game_info_table,
    user3_game_info_table,

    user0_levelmanager_table,
    user1_levelmanager_table,
    user2_levelmanager_table,
    user3_levelmanager_table,

    user0_item_table,
    user1_item_table,
    user2_item_table,
    user3_item_table,

    user0_collection_table,
    user1_collection_table,
    user2_collection_table,
    user3_collection_table,
    
    user0_timer_table,
    user1_timer_table,
    user2_timer_table,
    user3_timer_table,

    user0_login_bonus_table,
    user1_login_bonus_table,
    user2_login_bonus_table,
    user3_login_bonus_table,
    
    user0_gather_contents_table,
    user1_gather_contents_table,
    user2_gather_contents_table,
    user3_gather_contents_table,

    user0_episode_reward_table,
    user1_episode_reward_table,
    user2_episode_reward_table,
    user3_episode_reward_table,

    user0_level_quest_table,
    user1_level_quest_table,
    user2_level_quest_table,
    user3_level_quest_table,
  ],
})

export class UserV1_0_4Module {}
