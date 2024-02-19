import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { RedisService } from '../../cache/redis.service';

import { GameDatabaseService } from 'src/common/database/game_database.service';
import { GateDatabaseService } from 'src/common/database/gate_database.service';
import { UserDatabaseService } from 'src/common/database/user_database.service';

@Injectable()
export class CommonService {
  constructor(
    private readonly redisService: RedisService,
    private readonly gameDatabase : GameDatabaseService,
    private readonly gateDatabase : GateDatabaseService,
    private readonly userDatabase : UserDatabaseService,
  ) {}
  
  async trim(str: any) {
    // String check
    if(str.replace(/(\s*)/g, "")){
      return true;
    }else{
      return false;
    }
  }

  async datetimeReplace(str: any) {
    let total_str = "";

    total_str = str.replace(/-/g, "");
    total_str = total_str.replace(/(\s*)/g, "");
    total_str = total_str.replace(/:/g, "");

    return total_str;
  }

  async count(obj: any){
    return Object.keys(obj).length;
  }

  async treenod_platform(Acounttype: number, device_uuid: string, access_token: any) {
    let post_data = {};
    
    switch(Acounttype){
      case 1: post_data['provider'] = 'guest';break;
      case 2: post_data['provider'] = 'google';break;
      case 3: post_data['provider'] = 'facebook';break;
      case 4: post_data['provider'] = 'apple';break;
      default: post_data['provider'] = 'guest';break;
    }

    if(post_data['provider'] == 'google'){
      post_data['id_token'] = access_token;
    }else if(post_data['provider'] == 'facebook'){
      post_data['access_token'] = access_token;
    }else{
      post_data['uuid'] = device_uuid;
    }

    const res = await axios.post('https://gauth-i.dev.platform.treenod.com/auth/login', post_data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Town-AppId': 'BUBBLE',
      },
    })

    // 인증할 수 없는 정보
    if(res.data.code != 0){
      throw new HttpException(
        {
            status : res.data.code,
            message : res.data.message,
        },
        HttpStatus.NON_AUTHORITATIVE_INFORMATION,
      );
    }

    return res.data.data;
  }

  async now(unit: string) {
    const hrTime = process.hrtime();
    
    switch (unit) {
      case 'milli':
        return hrTime[0] * 1000 + hrTime[1] / 1000000;
      case 'micro':
        return hrTime[0] * 1000000 + hrTime[1] / 1000;
      case 'nano':
      default:
        return hrTime[0] * 1000000000 + hrTime[1];
    }
  }

  async check_overlap_device(Usn: string, Deviceuuid: string) {
    const key = "user:deviceCheck:" + Usn;
    const checkDeviceuuid = await this.redisService.get(key);

    if(checkDeviceuuid != Deviceuuid){
      throw new HttpException(
        {
            status : 900,
            message : 'Duplicate Login.',
        },
        HttpStatus.NON_AUTHORITATIVE_INFORMATION,
      );
    }
  }

  async addRewardArr(reward_data: Object) {
    let reward = Array();

    let num = 0;
    for(let i=1; i<=6; i++){
      if(reward_data['Reward_Type' + i] != "NONE"){
        reward[num] = {};
        reward[num]['type'] = reward_data['Reward_Type' + i];
        reward[num]['value'] = reward_data['Reward_Value' + i];
        reward[num]['cnt'] = reward_data['Reward_Count' + i];

        num++;
      }
    }
  
    return reward;
  }

  async user_game_info_ret(user_game_info) {
    let ret = {};
    ret['Coin']                 = user_game_info[0]['Coin'];
    ret['Level']                = user_game_info[0]['Level'];
    ret['LevelClearCnt']        = user_game_info[0]['LevelClearCnt'];
    ret['Stamina']              = user_game_info[0]['Stamina'];
    ret['StaminaLastChrgeTime'] = user_game_info[0]['StaminaLastChrgeTime'];
  
    return ret;
  }

  async get_date(type) {
    let today = new Date();
    if(type == 'day'){
      let weekday = new Array(7);

      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";

      return weekday[today.getDay()];
    }

    if(type == "YYMMDD"){
      let year = today.getFullYear();
      let month = ('0' + (today.getMonth() + 1)).slice(-2);
      let day = ('0' + today.getDate()).slice(-2);

      return year + '-' + month  + '-' + day;
    }
    if(type == "YYMMDDHHII"){
      let year = today.getFullYear();
      let month = ('0' + (today.getMonth() + 1)).slice(-2);
      let day = ('0' + today.getDate()).slice(-2);
      let hour = today.getHours();
      let min = today.getMinutes();

      return year + month  + day + hour + min;
    }

    if(type == 'dayNumber'){
      let dayNumber = '1' + today.getDay().toString();
      return dayNumber;
    }
  }

  async setGameInfo(Dbnum: number, Uidx: number, Type: string, setGameinfo: any){
    // let user_game_info = await this.userDatabase.get("user_game_info", Dbnum, {"Uidx": Uidx});
    
    // let coin = user_game_info[0]['Coin'] - g26_continue[continueId]['Cost'];

    // if(coin < 0){
    //     throw new HttpException(
    //         {
    //             status : 33,
    //             message : 'Not enough Coin.',
    //         },
    //         HttpStatus.NOT_FOUND,
    //     );
    // }
  }
  
  async newAddReward(Dbnum: number, Uidx: number, addReward: any){
    let ret_item = {};
    let ret_item_data = [];
    let COIN = 0;
    let STAMINA = 0;
    let in_item = [];
    let in_collection = [];
    let item_list = [];
    let collection_list = [];

    for await (const reward of addReward){
        ret_item = await this.addReward(Dbnum, Uidx, reward['type'], reward['value'], reward['cnt']);

        ret_item_data.push(ret_item);

        if(ret_item['Item_Type'] == "COIN"){
            COIN += ret_item['Item_Count'];
        }else if(ret_item['Item_Type'] == "STAMINA"){
            STAMINA += ret_item['Item_Count'];
        }else if(ret_item['Item_Type'] == 'ITEM'){
            in_item.push(ret_item['Item_Id']);
        }else if(ret_item['Item_Type'] == 'COLLECTION'){
            in_collection.push(ret_item['Item_Id']);
        }
    }

    if(in_item.length > 0){
        item_list = await this.userDatabase.getIn('user_item', Dbnum, Uidx, in_item);
    }

    if(in_collection.length > 0){
        collection_list = await this.userDatabase.getIn('user_collection', Dbnum, Uidx, in_collection);
    }

    return [ret_item_data, COIN, STAMINA, item_list, collection_list];
}

async addReward(Dbnum: number, Uidx: number, type: string, Id: number, cnt: number) {
    let ret_data = {};
    if(type == "ITEM"){
        let user_item = await this.userDatabase.get("user_item", Dbnum, {"Uidx": Uidx, "Id": Id});

        if(await this.count(user_item) == 0){
            // Insert
            await this.userDatabase.add("user_item", Dbnum, {"Uidx": Uidx, "Id": Id, "Cnt": cnt});
        }else{
            // Update
            let total_cnt = user_item[0]['Cnt'] + cnt;
            await this.userDatabase.set("user_item", Dbnum, {"Uidx": Uidx, "Id": Id}, {"Cnt": total_cnt});
        }

        ret_data = {"Item_Type": type, "Item_Id": Id, "Item_Count": cnt};
    }

    if(type == "COIN"){
        let user_data = await this.userDatabase.get("user_game_info", Dbnum, {"Uidx": Uidx});
        let total_coin = user_data[0]['Coin'] + cnt;
        let free_total_coin = user_data[0]['FreeCoin'] + cnt;

        await this.userDatabase.set("user_game_info", Dbnum, {"Uidx": Uidx}, {"Coin": total_coin, "FreeCoin": free_total_coin});

        ret_data = {"Item_Type": type, "Item_Id": Id, "Item_Count": cnt};
    }

    if(type == "STAMINA"){
        let user_data = await this.userDatabase.get("user_game_info", Dbnum, {"Uidx": Uidx});
        let total_stamina = user_data[0]['Stamina'] + cnt;

        await this.userDatabase.set("user_game_info", Dbnum, {"Uidx": Uidx}, {"Stamina": total_stamina});
        
        ret_data = {"Item_Type": type, "Item_Id": Id, "Item_Count": cnt};
    }

    if(type == "COLLECTION"){
        let user_collection = await this.userDatabase.get("user_collection", Dbnum, {"Uidx": Uidx, "Id": Id});

        if(await this.count(user_collection) == 0){
            // Insert
            await this.userDatabase.add("user_collection", Dbnum, {"Uidx": Uidx, "Id": Id, "Cnt": cnt});
        }else{
            // Update
            let total_cnt = user_collection[0]['Cnt'] + cnt;
            await this.userDatabase.set("user_collection", Dbnum, {"Uidx": Uidx, "Id": Id}, {"Cnt": total_cnt});
        }

        ret_data = {"Item_Type": type, "Item_Id": Id, "Item_Count": cnt};
    }

    if(type == "RANDOM"){
        let g32_random_reward = await this.gameDatabase.getGameListsDetail("g32_random_reward", "Group_Id", Id.toString());
        let rand_item = await this.pick_random_item(g32_random_reward);
        ret_data = await this.addReward(Dbnum, Uidx, rand_item['Item_Type'], rand_item['Item_ID'], rand_item['Count_Value']);
    }

    return ret_data;
  }

  async pick_random_item(g32_random_reward: any) {
    let rand_num = Math.floor(Math.random() * 100 + 1);
    let ret_item = {};

    let total_percentage = 0;
    
    for await(const rand_item of g32_random_reward){
        total_percentage += Number(rand_item['Percentage']);

        if(total_percentage >= rand_num){
            if(Object.keys(ret_item).length == 0){
                ret_item = rand_item;
            }
        }
    }

    return ret_item;
  }

  async setUserGameInfo(Dbnum: number, Uidx: number, set_type: string, set_cnt: number, charge_type: string){
    let user_game_info = await this.userDatabase.get("user_game_info", Dbnum, {"Uidx": Uidx});

    let type = "";
    switch(set_type){
      case "COIN" : type = 'Coin'; break;
      case "STAMINA" : type = 'Stamina'; break;
      default :
        throw new HttpException(
          {
              status : 5,
              message : 'There is no parameter.',
          },
          HttpStatus.NOT_FOUND,
        );
      break;
    }

    if(set_cnt < 0){
      let cnt = user_game_info[0][type] + set_cnt;

      // 재화가 부족하지 않은지 확인
      if(cnt < 0){
        throw new HttpException(
            {
                status : 33,
                message : 'Not enough ' + type + '.',
            },
            HttpStatus.NOT_FOUND,
        );
      }
    }

    let set_charged_coin = user_game_info[0]['ChargedCoin'];
    let set_free_coin = user_game_info[0]['FreeCoin'];
    let set_coin = user_game_info[0]['Coin'];
    let set_stamina = user_game_info[0]['Stamina'];

    if(type == "Coin"){
      if(set_cnt < 0){
        console.log(set_cnt);
        // 충전 코인부터 소모
        set_charged_coin += set_cnt;
        if(set_charged_coin < 0){
          set_free_coin += set_charged_coin;
          set_charged_coin = 0;
        }
      }else{
        // 코인 충전이라면 유료인지 확인
        if(charge_type == "CHARGED"){
          set_charged_coin += set_cnt;
        }else{
          set_free_coin += set_cnt;
        }
      }
      set_coin += set_cnt;
    }

    if(type == "Stamina"){
      set_stamina += set_cnt;
    }
  
    let set_obj = {"Coin": set_coin, "FreeCoin": set_free_coin, "ChargedCoin": set_charged_coin, "Stamina": set_stamina};

    await this.userDatabase.set('user_game_info', Dbnum, {"Uidx": Uidx}, set_obj);

    user_game_info[0]['Coin'] = set_coin;
    user_game_info[0]['Stamina'] = set_stamina;

    return user_game_info;
  }
}