import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RedisService } from '../../cache/redis.service';
import { CommonService } from '../../common/src/common.service'

import { 
    ShopListDto,
    ShopBuyDto,
} from './dto/shopDto.dto';

import { GameDatabaseService } from 'src/common/database/game_database.service';
import { GateDatabaseService } from 'src/common/database/gate_database.service';
import { UserDatabaseService } from 'src/common/database/user_database.service';
import { execFileSync } from 'child_process';

@Injectable()
export class ShopService {
    constructor(
        private readonly redisService: RedisService,
        private readonly common : CommonService,
        private readonly gameDatabase : GameDatabaseService,
        private readonly gateDatabase : GateDatabaseService,
        private readonly userDatabase : UserDatabaseService,
    ){}

    async shopList(shopListDto: ShopListDto) {
        const Uid = shopListDto.Uid;
        const Usn = shopListDto.Usn;
        const Deviceuuid = shopListDto.Deviceuuid;
        const Group_No = shopListDto.Group_No;

        const user_gate = await this.gateDatabase.get_user_gate_cache(Uid, Usn);

        // 중복접속 확인
        await this.common.check_overlap_device(Usn, Deviceuuid);

        let g94_shop_product_info = await this.gameDatabase.getGameLists("g94_shop_product_info");
        const g95_shop_item = await this.gameDatabase.getGameLists("g95_shop_item");

        const Dbnum = user_gate.Dbnum;

        const YYMMDDHHII = await this.common.get_date("YYMMDDHHII");
        const dayNumber = await this.common.get_date('dayNumber');

        let shop_list = [];
        for await (const [key, value] of Object.entries(g94_shop_product_info[Group_No.toString()])){
            delete value['Id'];
            delete value['Group_No'];

            // 요일별 상품 
            if(value['Status'] >= 10){
                if(Number(dayNumber) == value['Status']){
                    if(value['Sale_Start'] == 'null'){
                        shop_list.push(value);
                        continue;
                    }else{
                        // 요일별 상품 날짜별
                        if(Number(await this.common.datetimeReplace(value['Sale_Start'])) <= Number(YYMMDDHHII) && Number(await this.common.datetimeReplace(value['Sale_End'])) >= Number(YYMMDDHHII)){
                            shop_list.push(value);
                            continue;
                        }
                    }
                }
            }else{
                if(value['Sale_Start'] != 'null'){
                    // 일반 상품 날짜별
                    if(Number(await this.common.datetimeReplace(value['Sale_Start'])) <= Number(YYMMDDHHII) && Number(await this.common.datetimeReplace(value['Sale_End'])) >= Number(YYMMDDHHII)){
                        shop_list.push(value);
                        continue;
                    }
                }

                // 활성화 여부
                if(value['Status'] != 0){
                    shop_list.push(value);
                    continue;
                }
            }
        }

        return shop_list;
    }

    async shopBuy(shopBuyDto: ShopBuyDto) {
        const Uid = shopBuyDto.Uid;
        const Usn = shopBuyDto.Usn;
        const Deviceuuid = shopBuyDto.Deviceuuid;
        const ShopId = shopBuyDto.ShopId.toString();

        const user_gate = await this.gateDatabase.get_user_gate_cache(Uid, Usn);

        // 중복접속 확인
        await this.common.check_overlap_device(Usn, Deviceuuid);

        const Uidx = user_gate.Uidx;
        const Dbnum = user_gate.Dbnum;

        const shop_product = await this.gameDatabase.getGameListsDetail("g94_shop_product_info", "Id", ShopId);

        const YYMMDDHHII = await this.common.get_date("YYMMDDHHII");
        const dayNumber = await this.common.get_date('dayNumber');

        if(shop_product === null){
            throw new HttpException(
                {
                    status : 98,
                    message : 'There is no data.',
                },
                HttpStatus.NOT_FOUND,
            );
            
        }
        
        // 요일별 상품 
        if(shop_product[0]['Status'] >= 10){
            if(Number(dayNumber) == shop_product[0]['Status']){
                if(shop_product[0]['Sale_Start'] != 'null'){
                    // 요일별 상품 날짜별
                    if(Number(await this.common.datetimeReplace(shop_product[0]['Sale_Start'])) > Number(YYMMDDHHII) || Number(await this.common.datetimeReplace(shop_product[0]['Sale_End'])) < Number(YYMMDDHHII)){
                        // 이미 판매 기간이 지난 상품
                        throw new HttpException(
                            {
                                status : 34,
                                message : 'This product is no longer available for purchase.',
                            },
                            HttpStatus.NOT_FOUND,
                        );
                    }
                }
            }else{
                // 해당 요일에 살 수 없는 상품
                throw new HttpException(
                    {
                        status : 34,
                        message : 'This product is no longer available for purchase.',
                    },
                    HttpStatus.NOT_FOUND,
                );
            }
        }else{
            if(shop_product[0]['Sale_Start'] != 'null'){
                if(Number(await this.common.datetimeReplace(shop_product[0]['Sale_Start'])) > Number(YYMMDDHHII) || Number(await this.common.datetimeReplace(shop_product[0]['Sale_End'])) < Number(YYMMDDHHII)){
                    // 이미 판매 기간이 지난 상품
                    throw new HttpException(
                        {
                            status : 34,
                            message : 'This product is no longer available for purchase.',
                        },
                        HttpStatus.NOT_FOUND,
                    );
                }
            }

            // 활성화 여부
            if(shop_product[0]['Status'] == 0){
                // 판매하지 않는 상품
                throw new HttpException(
                    {
                        status : 34,
                        message : 'This product is no longer available for purchase.',
                    },
                    HttpStatus.NOT_FOUND,
                );
            }
        }
        const g95_shop_item = await this.gameDatabase.getGameLists("g95_shop_item");

        if(typeof(g95_shop_item[shop_product[0]['Product_Id_Normal']]) == 'undefined'){
            throw new HttpException(
                {
                    status : 98,
                    message : 'There is no data.',
                },
                HttpStatus.NOT_FOUND,
            );
            
        }

        let addReward = [];
        for await(const reward of g95_shop_item[shop_product[0]['Product_Id_Normal']]){
            let add = {};
            add['type'] = reward['Item_Type'];
            add['value'] = reward['Item_Id'];
            add['cnt'] = reward['Item_Count'];

            addReward.push(add);
        }

        console.log(addReward);
        
        let ret_game_info = Object();
        if(shop_product[0]['Price_Type'] == 'COIN'){
            ret_game_info = await this.common.setUserGameInfo(Dbnum, Uidx, shop_product[0]['Price_Type'], -shop_product[0]['Real_Price'], 'FREE');
        }else{
            ret_game_info = await this.userDatabase.get('user_game_info', Dbnum, {"Uidx": Uidx});
        }
        
        let ret_reward = Object();
        [ret_reward.ret_item_data, ret_reward.coin, ret_reward.stamina, ret_reward.item_list, ret_reward.collection_list] = await this.common.newAddReward(Dbnum, Uidx, addReward);

        let ret = {};

        ret_game_info['Coin'] = ret_reward.coin;
        ret_game_info['Stamina'] = ret_reward.stamina;

        ret['user_game_info'] = await this.common.user_game_info_ret(ret_game_info);
        ret['user_item'] = ret_reward.item_list;
        ret['user_collection'] = ret_reward.collection_list;
        ret['reward_list'] = ret_reward.ret_item_data;

        return ret;
    }
}

