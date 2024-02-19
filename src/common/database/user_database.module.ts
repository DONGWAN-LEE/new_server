// redis-cache.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDatabaseService } from './user_database.service'

import { RedisModule } from '../../cache/redis.module';
import { RedisService } from '../../cache/redis.service';

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
} from '../entities/user/';

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

@Module({
  imports: [
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
    RedisModule
  ],
  providers: [
    UserDatabaseService,
    RedisService,

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

export class UserDatabaseModule {
}