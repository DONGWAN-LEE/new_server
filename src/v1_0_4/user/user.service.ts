import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RedisService } from '../../cache/redis.service';
import { CommonService } from '../../common/src/common.service'

import { 
    CheckUserDto, 
    UserJoinDto,
    UserLoginDto,
    LevelStartDto,
    LevelEndDto,
    SetTutorialDto,
    UseItemDto,
} from './dto/userDto.dto';

import { GameDatabaseService } from 'src/common/database/game_database.service';
import { GateDatabaseService } from 'src/common/database/gate_database.service';
import { UserDatabaseService } from 'src/common/database/user_database.service';

@Injectable()
export class UserService {
    constructor(
        private readonly redisService: RedisService,
        private readonly common : CommonService,
        private readonly gameDatabase : GameDatabaseService,
        private readonly gateDatabase : GateDatabaseService,
        private readonly userDatabase : UserDatabaseService,
    ){}

    async checkUser(checkUserDto: CheckUserDto){
        const Acounttype = checkUserDto.Acounttype;
        const Accesstoken = checkUserDto.Accesstoken;
        let Usn = checkUserDto.Usn;
        let Deviceuuid = checkUserDto.Deviceuuid;

        let platform_is_pass = 0;
        
        if(Acounttype == 1) {
            if(await this.common.trim(Usn) === true){
                platform_is_pass = 1;
            }else{
                //const date = new Date();
                //device_uuid = device_uuid + "_" + date.getTime();
            }
        }

        if(platform_is_pass == 0){
            // Treenode platform 연결
            const treenod_data = await this.common.treenod_platform(Acounttype, Deviceuuid, Accesstoken);
            Usn = treenod_data.identity_id;
            console.log(treenod_data);
        }

        

        const key = "user:user_data:" + Usn;

        let ret = await this.redisService.get(key);

        if(ret == null){
            let where_params = [];
            where_params.push(Usn);
            const user_share_data = await this.gateDatabase.get_user_gate(where_params);
            console.log(ret);
            ret = user_share_data[0];

            if(typeof(ret) === 'undefined'){
                throw new HttpException(
                    {
                        status : 998,
                        message : 'New Create User!',
                    },
                    HttpStatus.CREATED,
                );
            }else{
                await this.redisService.set(key, ret);
            }
        }

        return ret;
    }

    async userJoin(userJoinDto: UserJoinDto){
        const date = new Date();
        const Os = userJoinDto.Os;
        const Acounttype = userJoinDto.Acounttype;
        const Accesstoken = userJoinDto.Accesstoken;
        let Deviceuuid = userJoinDto.Deviceuuid;
        let InviteCode = userJoinDto.InviteCode;

        const treenod_data = await this.common.treenod_platform(Acounttype, Deviceuuid, Accesstoken);
        const Usn = treenod_data.identity_id;

        // Cache 에 존재 하는 유저인지 체크 한다.
        let key = "user:user_data:" + Usn;
        let user_data = await this.redisService.get(key);

        if(user_data === null){
            let where_params = [];
            where_params.push(Usn);
            const user_share_data = await this.gateDatabase.get_user_gate(where_params);
            user_data = user_share_data[0];
        }
        let ret_data = Object();

        if(typeof(user_data) === 'undefined'){
            const USER_DB_CNT = Number(process.env.USER_DB_CNT);
            // 초대 코드가 있으면
            if (InviteCode == 1) {
            }

            // 회원가입
            const Uid = await this.common.now("nano");
            const retUid = Uid.toString();

            let add_params = {};

            add_params['Uid'] = retUid;
            add_params['Nickname'] = "";
            add_params['Profileurl'] = "";
            add_params['Usn'] = Usn;
            add_params['Deviceuuid'] = Deviceuuid;
            add_params['Dbnum'] = 0;
            add_params['Gmmode'] = 1;
            add_params['Withraw'] = 1;
            add_params['Pushstatus'] = 2;
            add_params['Acounttype'] = Acounttype;
            add_params['Os'] = Os;
            
            // Gate Table 에 유저 정보를 Insert 한다.
            user_data = await this.gateDatabase.add(add_params);
            const Uidx = user_data.Uidx;
            const Dbnum = Uidx % USER_DB_CNT;
            
            // DB 번호를 Gate Table 에 넣어준다.
            await this.gateDatabase.set(Uidx, {'Dbnum': Dbnum});

            let user_info_add_param = {};
            add_params['Uidx'] = Uidx;
            add_params['Joindatetime'] = new Date();

            const option_table = await this.gameDatabase.getGameLists('g90_option');
            add_params['Stamina'] = Number(option_table['StaminaBasicValue']['Option_Value']);
            add_params['StaminaLastChrgeTime'] = 0;

            await this.userDatabase.add('user_info', Dbnum, add_params);
            await this.userDatabase.add('user_game_info', Dbnum, add_params);

            // 가입 후 디바이스 정보를 입력한다 (중복 접속 차단)
            //await this.redisService.set("user:check_user_device:" + Uid, Deviceuuid);
        }

        return user_data;
    }

    async userLogin(userLoginDto: UserLoginDto) {
        const Uid = userLoginDto.Uid;
        const Usn = userLoginDto.Usn;
        const Deviceuuid = userLoginDto.Deviceuuid;

        const user_gate = await this.gateDatabase.get_user_gate_cache(Uid, Usn);

        if(typeof(user_gate) == 'undefined'){
            throw new HttpException(
                {
                    status : 998,
                    message : 'New Create User!',
                },
                HttpStatus.CREATED,
            );
        }

        const Dbnum = user_gate.Dbnum;
        let update_params = Object();

        // Device 가 변경 되었다면 Database 에서 Deviceuuid 를 변경해준다.
        if(Deviceuuid != user_gate.Deviceuuid){
            update_params['Deviceuuid'] = Deviceuuid;
            await this.gateDatabase.set(user_gate.Uidx, update_params);

            // Cache 된 Data도 변경한다.
            const key = "user:user_data:" + Usn;
            user_gate['Deviceuuid'] = Deviceuuid;
            await this.redisService.set(key, user_gate);
        }

        let nowTimestamp = Date.now() / 1000 | 0;
        let get_YYMMDD = await this.common.get_date('YYMMDD');

        update_params["Lastlogindatetime"] = new Date();
        
        // Login 시간
        await this.userDatabase.set("user_info", Dbnum, {"Uidx": user_gate.Uidx}, update_params);

        // 유저 정보 가져오기
        let user_game_info = await this.userDatabase.get("user_game_info", Dbnum, {"Uidx": user_gate.Uidx});
        let user_item = await this.userDatabase.get("user_item", Dbnum, {"Uidx": user_gate.Uidx});
        let Tutorial = await this.userDatabase.fieldGet("user_info", Dbnum, ["Tutorialstep"], {"Uidx": user_gate.Uidx});
        let user_timer = await this.userDatabase.getTimerList('user_timer', Dbnum, user_gate.Uidx, nowTimestamp);
        let user_gather_contents = await this.userDatabase.fieldGet("user_gather_contents", Dbnum, ['ReceiveWeek', 'Total_Target_Value', 'Target_Value', 'Last_Reward_Date'], {"Uidx": user_gate.Uidx});
        let login_bonus = await this.userDatabase.fieldGet("user_login_bonus", Dbnum, ["Day", "ReceiveDay"], {"Uidx": user_gate.Uidx});
        let user_episode_reward = await this.userDatabase.fieldGet("user_episode_reward", Dbnum, ['EpisodeRwardId'], {"Uidx": user_gate.Uidx})
        let user_level_quest = await this.userDatabase.fieldGet("user_level_quest", Dbnum, ["LastReceiveDay", "prevLevel", "nowLevel", "Reward1", "Reward2", "Reward3"],{"Uidx": user_gate.Uidx})

        console.log(user_level_quest);
        // 중복 로그인을 방지하기 위해 DeviceUUID Cache를 생성한다.
        await this.redisService.set("user:deviceCheck:" + Usn, Deviceuuid);

        // 비정상 종료시 연속 Clear 리셋
        if(user_game_info[0]['IsStart'] == 'Y'){
            console.log("Is Start Update");
            await this.userDatabase.set('user_game_info', Dbnum, {"Uidx": user_gate.Uidx}, {"LevelClearCnt": 0, "IsStart": 'N'});
        }

        // 게더 컨텐츠 초기화
        if(user_gather_contents.length != 0){
            if(user_gather_contents[0]['Last_Reward_Date'] != get_YYMMDD){
                let get_day = await this.common.get_date('day');
                let update_user_gather_contents = {"ReceiveWeek": get_day, "Total_Target_Value": 0, "Target_Value": 0, "Last_Reward_Date": get_YYMMDD};
                await this.userDatabase.set('user_gather_contents', Dbnum, {"Uidx": user_gate.Uidx},update_user_gather_contents);
                user_gather_contents[0] = update_user_gather_contents;
            }
        }

        // 레벨 퀘스트 초기화

        let ret_data = {};
        let episode_reward = [];

        for await(const episode_id of user_episode_reward){
            episode_reward.push(episode_id['EpisodeRwardId']);
        }

        ret_data['Tutorialstep'] = Tutorial[0]['Tutorialstep'];
        ret_data['user_game_info'] = await this.common.user_game_info_ret(user_game_info);
        ret_data['user_item'] = user_item;
        ret_data['user_timer'] = user_timer;
        ret_data['user_gather_contents'] = user_gather_contents;
        ret_data['user_login_bonus'] = login_bonus;
        ret_data['user_episode_reward'] = episode_reward.join();

        return ret_data;
    }

    async loginBonus(userLoginDto: UserLoginDto) {
        const Uid = userLoginDto.Uid;
        const Usn = userLoginDto.Usn;
        const Deviceuuid = userLoginDto.Deviceuuid;

        const user_gate = await this.gateDatabase.get_user_gate_cache(Uid, Usn);

        // 중복접속 확인
        await this.common.check_overlap_device(Usn, Deviceuuid);

        if(typeof(user_gate) == 'undefined'){
            throw new HttpException(
                {
                    status : 998,
                    message : 'New Create User!',
                },
                HttpStatus.CREATED,
            );
        }

        const Dbnum = user_gate.Dbnum;
        let get_YYMMDD = await this.common.get_date('YYMMDD');

        // 로그인 보상
        let login_bonus = await this.userDatabase.fieldGet("user_login_bonus", Dbnum, ["Day", "ReceiveDay"], {"Uidx": user_gate.Uidx});
        const g25_event_login_bonus = await this.gameDatabase.getGameLists('g25_event_login_bonus');
        const g12_reward = await this.gameDatabase.getGameLists('g12_reward');

        let next_bonus_day = 0;
        if(login_bonus.length == 0){
            next_bonus_day = 1;

            await this.userDatabase.add('user_login_bonus', Dbnum, {"Uidx": user_gate.Uidx, "BonusType": "Normal", "Day": 1, "ReceiveDay": get_YYMMDD});
            login_bonus[0] = {};
        }else{
            if(login_bonus[0]['ReceiveDay'] != get_YYMMDD){
                next_bonus_day = login_bonus[0]['Day'] + 1;
                if(typeof(g25_event_login_bonus[next_bonus_day]) == 'undefined'){
                    next_bonus_day = 1;
                }

                await this.userDatabase.set('user_login_bonus', Dbnum, {"Uidx": user_gate.Uidx}, {"Day": next_bonus_day, "ReceiveDay": get_YYMMDD});
            }
        }

        let ret_reward = Object();
        if(next_bonus_day > 0){
            let addReward = await this.common.addRewardArr(g12_reward[g25_event_login_bonus[next_bonus_day]['Reward']]);

            [
                ret_reward.ret_item_data, 
                ret_reward.coin, 
                ret_reward.stamina, 
                ret_reward.item_list, 
                ret_reward.collection_list
            ] = await this.common.newAddReward(Dbnum, user_gate.Uidx, addReward);

            login_bonus[0]['Day'] = next_bonus_day;
            login_bonus[0]['ReceiveDay'] = get_YYMMDD;
        }
        // 로그인 보상 끝~

        let user_game_info = await this.userDatabase.get("user_game_info", Dbnum, {"Uidx": user_gate.Uidx});
        //let user_item = await this.userDatabase.get("user_item", Dbnum, {"Uidx": user_gate.Uidx});

        let ret_data = {};

        ret_data['user_game_info'] = await this.common.user_game_info_ret(user_game_info);
        ret_data['user_item'] = ret_reward.item_list;
        ret_data['user_collection'] = ret_reward.collection_list;
        ret_data['user_login_bonus'] = login_bonus;
        ret_data['user_login_reward'] = ret_reward.ret_item_data;

        return ret_data;
    }
    
    async getTest() {
        let nowTimestamp = Date.now() / 1000 | 0;

        let user_item1 = await this.userDatabase.get('user_item', 1, {"Uidx": 1000005, "Id": 22000012});
        let user_item2 = await this.userDatabase.get('user_item', 1, {"Uidx": 1000005, "Id": 22000014});
        let user_item3 = await this.userDatabase.get('user_item', 1, {"Uidx": 1000005, "Id": 22000015});

        if(
            Object.keys(user_item1).length == 0 || user_item1[0]['Cnt'] == 0 || 
            Object.keys(user_item2).length == 0 || user_item2[0]['Cnt'] == 0 || 
            Object.keys(user_item3).length == 0 || user_item3[0]['Cnt'] == 0
        ){
            throw new HttpException(
                {
                    status : 33,
                    message : 'Not enough Item.',
                },
                HttpStatus.NOT_MODIFIED,
            );
        }
        
        let test = await this.userDatabase.getTimer('user_timer', 1, 1000005, 'TEST', nowTimestamp);
        console.log(test);

        Object.entries(test).forEach(async ([key, value], index) => {
            console.log("Key : " + key);
            console.log("TimerEndTime : " + value['TimerEndTime']);
        });
        console.log(nowTimestamp);
    }

    async levelStart(levelStartDto: LevelStartDto) {
        let nowTimestamp = Date.now() / 1000 | 0;

        const Uid = levelStartDto.Uid;
        const Usn = levelStartDto.Usn;
        const Deviceuuid = levelStartDto.Deviceuuid;

        let ReadyItemNo1 = levelStartDto.ReadyItemNo1;
        let ReadyItemNo2 = levelStartDto.ReadyItemNo2;
        let ReadyItemNo3 = levelStartDto.ReadyItemNo3;

        // 중복접속 확인
        await this.common.check_overlap_device(Usn, Deviceuuid);
        
        const user_gate = await this.gateDatabase.get_user_gate_cache(Uid, Usn);
        const Uidx = user_gate.Uidx;
        const Dbnum = user_gate.Dbnum;

        const g22_item = await this.gameDatabase.getGameLists('g22_item');

        // Timer Item Check
        let check_timer_item = await this.userDatabase.getTimerList('user_timer', 1, 1000005, nowTimestamp);

        Object.entries(check_timer_item).forEach(async ([key, value], index) => {
            let remove_id = value['Use_Value']

            if(remove_id == ReadyItemNo1){
                ReadyItemNo1 = 0;
            }
            if(remove_id == ReadyItemNo2){
                ReadyItemNo2 = 0;
            }
            if(remove_id == ReadyItemNo3){
                ReadyItemNo3 = 0;
            }
        });

        let user_game_info = await this.userDatabase.get('user_game_info', Dbnum, {"Uidx": Uidx});

        let user_game_data = await this.stamina_charge(user_game_info, Uidx, Dbnum, 0);

        let user_level = user_game_data['Level'];
        let user_stamina = user_game_data['Stamina'];

        // 게임을 진행할 수 있는 스테미나가 있는지 확인
        if(user_game_data['Stamina'] < 1){
            throw new HttpException(
                {
                    status : 96,
                    message : 'You are out of Heart.',
                },
                HttpStatus.CREATED,
            );
        }

        const g13_levelmanager = await this.gameDatabase.getGameLists('g13_levelmanager');

        // 해당 레벨이 있는지 확인
        if(typeof(g13_levelmanager[user_level]) == 'undefined'){
            throw new HttpException(
                {
                    status : 91,
                    message : 'You`ve reached the final region. You cannot go any further.',
                },
                HttpStatus.NO_CONTENT,
            );
        }

        // 아이템 사용
        let ReadyItemCnt1 = 0;
        let ReadyItemCnt2 = 0;
        let ReadyItemCnt3 = 0;

        if(ReadyItemNo1 > 0){
            ReadyItemCnt1 = await this.update_user_item(g22_item, nowTimestamp, ReadyItemNo1, Dbnum, Uidx, -1);
        }
        if(ReadyItemNo2 > 0){
            ReadyItemCnt2 = await this.update_user_item(g22_item, nowTimestamp, ReadyItemNo2, Dbnum, Uidx, -1);
        }
        if(ReadyItemNo3 > 0){
            ReadyItemCnt3 = await this.update_user_item(g22_item, nowTimestamp, ReadyItemNo3, Dbnum, Uidx, -1);
        }

        let update_params = Object();
        
        let cnt = 0;

        if(user_game_info[0]['IsStart'] == 'N'){
            cnt = Number(user_game_info[0]['LevelClearCnt']);
        }
        
        update_params = {"LevelClearCnt": cnt, "IsStart": 'Y'};
        await this.userDatabase.set('user_game_info', Dbnum, {"Uidx": Uidx}, update_params);

        let ret_data = Object();

        user_game_info[0]['Stamina'] = await this.set_stamina(Uidx, Dbnum, user_stamina, -1);
        user_game_info[0]['Level'] = user_level;

        ret_data['user_game_info'] = await this.common.user_game_info_ret(user_game_info);

        ret_data['ReadyItemNo1'] = ReadyItemNo1;
        ret_data['ReadyItemCnt1'] = ReadyItemCnt1;
        ret_data['ReadyItemNo2'] = ReadyItemNo2;
        ret_data['ReadyItemCnt2'] = ReadyItemCnt2;
        ret_data['ReadyItemNo3'] = ReadyItemNo3;
        ret_data['ReadyItemCnt3'] = ReadyItemCnt3;

        return ret_data;
    }

    async levelEnd(levelEndDto: LevelEndDto) {
        let nowTimestamp = Date.now() / 1000 | 0;

        const Uid = levelEndDto.Uid;
        const Usn = levelEndDto.Usn;
        const Deviceuuid = levelEndDto.Deviceuuid;
        const ClearLevel = levelEndDto.ClearLevel;
        const IsClear = levelEndDto.IsClear;  // Level Success 여부 (1-성공, 2-실패)
        let Target_Value = levelEndDto.Target_Value;

        // 중복접속 확인
        await this.common.check_overlap_device(Usn, Deviceuuid);
        
        const user_gate = await this.gateDatabase.get_user_gate_cache(Uid, Usn);
        const Uidx = user_gate.Uidx;
        const Dbnum = user_gate.Dbnum;

        let user_game_info = await this.userDatabase.get('user_game_info', Dbnum, {"Uidx": Uidx});

        if(user_game_info[0]['Level'] != ClearLevel){
            throw new HttpException(
                {
                    status : 24,
                    message : 'It is incorrectly requested.',
                },
                HttpStatus.NOT_FOUND,
            );
        }

        let user_game_data = await this.stamina_charge(user_game_info, Uidx, Dbnum, 0);

        user_game_info[0]['Stamina'] = user_game_data['Stamina'];

        // Start API 를 거치지 않고 End API 를 연속 호출
        if(user_game_info[0]['IsStart'] == 'N'){
            throw new HttpException(
                {
                    status : 24,
                    message : 'It is incorrectly requested.',
                },
                HttpStatus.NOT_FOUND,
            );
        }
        let ret_data = Object();
        let ret_reward = Object();

        if(IsClear == 2){
            // 연속 클리어를 0으로 만들어 준다.
            await this.userDatabase.set('user_game_info', Dbnum, {"Uidx": Uidx}, {"LevelClearCnt": 0, "IsStart": 'N'});

            user_game_info[0]['LevelClearCnt'] = 0;
        }else if(IsClear == 1){
            const g12_reward = await this.gameDatabase.getGameLists('g12_reward');
            const g13_levelmanager = await this.gameDatabase.getGameLists('g13_levelmanager');

            const game_levelmanager = g13_levelmanager[user_game_info[0]['Level']];

            let addReward = await this.common.addRewardArr(g12_reward[game_levelmanager['Reward']]);

            [
                ret_reward.ret_item_data, 
                ret_reward.coin, 
                ret_reward.stamina, 
                ret_reward.item_list, 
                ret_reward.collection_list
            ] = await this.common.newAddReward(Dbnum, Uidx, addReward);
            
            user_game_info[0]['Coin'] += ret_reward.coin;
            user_game_info[0]['Stamina'] += ret_reward.stamina;

            user_game_info[0]['Level'] += 1;
            user_game_info[0]['LevelClearCnt'] += 1;
            user_game_info[0]['Stamina'] += 1;
            
            let update_params = {"Stamina": user_game_info[0]['Stamina'], "Level": user_game_info[0]['Level'], "LevelClearCnt": user_game_info[0]['LevelClearCnt'], "IsStart": 'N'};

            // Level 과 연속 Clear 를 update 해준다.
            await this.userDatabase.set('user_game_info', Dbnum, {"Uidx": Uidx}, update_params);

            // Gather Contents Target_Value 입력
            let get_day = await this.common.get_date('day');
            let get_YYMMDD = await this.common.get_date('YYMMDD');
            const g23_gather_contents_info = await this.gameDatabase.getGameLists('g23_gather_contents_info');

            let gather_start_time = new Date(get_YYMMDD + "T" + g23_gather_contents_info[get_day]['Start_Time']).getTime() / 1000 | 0;
            let gather_end_time = gather_start_time + g23_gather_contents_info[get_day]['Count_Time'];

            if(gather_start_time <= nowTimestamp && gather_end_time >= nowTimestamp){
                let user_gather_contents = await this.userDatabase.get("user_gather_contents", Dbnum, {"Uidx": Uidx});

                if(user_gather_contents.length == 0){
                    await this.userDatabase.add("user_gather_contents", Dbnum, {"Uidx": Uidx, "ReceiveWeek": get_day, "Target_Value": Target_Value, "Last_Reward_Date": get_YYMMDD});
                }else{
                    let update_gather_contents = {};
                    if(user_gather_contents[0]['Last_Reward_Date'] == get_YYMMDD){
                        Target_Value += user_gather_contents[0]['Target_Value'];
                        update_gather_contents = {"Target_Value": Target_Value}
                    }else{
                        update_gather_contents = {"ReceiveWeek": get_day, "Total_Target_Value": 0, "Target_Value": Target_Value, "Last_Reward_Date": get_YYMMDD};
                    }
                    await this.userDatabase.set("user_gather_contents", Dbnum, {"Uidx": Uidx}, update_gather_contents);
                }
            }
            // Gather Contents Target_Value 끝
        }else{
            throw new HttpException(
                {
                    status : 5,
                    message : 'There is no parameter.',
                },
                HttpStatus.NOT_FOUND,
            );
        }

        ret_data['user_game_info'] = await this.common.user_game_info_ret(user_game_info);
        ret_data['item_reward'] = ret_reward.ret_item_data;

        return ret_data;
    }

    async setGatherContents(userLoginDto) {
        let nowTimestamp = Date.now() / 1000 | 0;

        const Uid = userLoginDto.Uid;
        const Usn = userLoginDto.Usn;
        const Deviceuuid = userLoginDto.Deviceuuid;

        // 중복접속 확인
        await this.common.check_overlap_device(Usn, Deviceuuid);
        
        const user_gate = await this.gateDatabase.get_user_gate_cache(Uid, Usn);
        const Uidx = user_gate.Uidx;
        const Dbnum = user_gate.Dbnum;

        // Gather Event 보상 지급
        let get_day = await this.common.get_date('day');
        let get_YYMMDD = await this.common.get_date('YYMMDD');
        const g23_gather_contents_info = await this.gameDatabase.getGameLists('g23_gather_contents_info');

        let gather_start_time = new Date(get_YYMMDD + "T" + g23_gather_contents_info[get_day]['Start_Time']).getTime() / 1000 | 0;
        let gather_end_time = gather_start_time + g23_gather_contents_info[get_day]['Count_Time'];

        if(gather_start_time <= nowTimestamp && gather_end_time >= nowTimestamp){
            let Mission_Id = g23_gather_contents_info[get_day]['Mission_Id'];

            let user_gather_contents = await this.userDatabase.get("user_gather_contents", Dbnum, {"Uidx": Uidx});

            // 데이터가 없으면 잘못 접근 한것.
            if(user_gather_contents.length == 0){
                throw new HttpException(
                    {
                        status : 24,
                        message : 'It is incorrectly requested.',
                    },
                    HttpStatus.NOT_FOUND,
                );
            }

            if(user_gather_contents[0]['Last_Reward_Date'] != get_YYMMDD){
                return '';
            }

            const g24_gather_contents_list = await this.gameDatabase.getGameLists('g24_gather_contents_list');

            let Reward_Target_Value = 0;
            let addReward = [];
            
            let Total_Target_Value = user_gather_contents[0]['Total_Target_Value'];
            let Target_Value = user_gather_contents[0]['Target_Value'];

            let Next_Total_Target_Value = Total_Target_Value + Target_Value;

            let gather_contents = g24_gather_contents_list[Mission_Id];
            const g12_reward = await this.gameDatabase.getGameLists('g12_reward');

            for(let i=1 ; i<=Object.keys(gather_contents).length ; i++){
                Reward_Target_Value += gather_contents[i]['Target_Value'];
                if(Total_Target_Value <= Reward_Target_Value && Next_Total_Target_Value >= Reward_Target_Value){
                    addReward.push(await this.common.addRewardArr(g12_reward[gather_contents[i]['Reward_Id']]));
                }
                if(Next_Total_Target_Value < Reward_Target_Value){
                    break;
                }
            }

            await this.userDatabase.set("user_gather_contents", Dbnum, {"Uidx": Uidx}, {"Total_Target_Value": Next_Total_Target_Value, "Target_Value": 0});

            let ret_item_data = Object();
            ret_item_data.ret_item_data = [];
            ret_item_data.item_list = [];
            ret_item_data.collection_list = [];

            for(let n=0; n<addReward.length; n++){
                let ret_item_data_sub = Object();

                [
                    ret_item_data_sub.ret_item_data, 
                    ret_item_data_sub.coin, 
                    ret_item_data_sub.stamina, 
                    ret_item_data_sub.item_list, 
                    ret_item_data_sub.collection_list
                ] = await this.common.newAddReward(Dbnum, Uidx, addReward[n]);

                ret_item_data.ret_item_data = ret_item_data.ret_item_data.concat(ret_item_data_sub.ret_item_data);
                ret_item_data.item_list = ret_item_data.item_list.concat(ret_item_data_sub.item_list);
                ret_item_data.collection_list = ret_item_data.collection_list.concat(ret_item_data_sub.collection_list);
            }

            let user_game_info = await this.userDatabase.get("user_game_info", Dbnum, {"Uidx": Uidx});

            let ret_gather_contents = {};
            let ret = {};

            ret_gather_contents['Total_Target_Value'] = Next_Total_Target_Value;
            ret_gather_contents['Target_Value'] = 0;

            ret['user_game_info'] = user_game_info[0];
            ret['user_gather_contents'] = ret_gather_contents;
            ret['user_item'] = ret_item_data.item_list;
            ret['user_collection'] = ret_item_data.collection_list;
            ret['reward_list'] = ret_item_data.ret_item_data;

            return ret;
        }

        return '';
        // Gather Event 보상 지급 끝~
    }

    async setContinue(setContinueDto) {
        const Uid = setContinueDto.Uid;
        const Usn = setContinueDto.Usn;
        const Deviceuuid = setContinueDto.Deviceuuid;
        const continueId = setContinueDto.Id;

        // 중복접속 확인
        await this.common.check_overlap_device(Usn, Deviceuuid);

        const user_gate = await this.gateDatabase.get_user_gate_cache(Uid, Usn);
        const Uidx = user_gate.Uidx;
        const Dbnum = user_gate.Dbnum;

        //let user_game_info = await this.userDatabase.get("user_game_info", Dbnum, {"Uidx": Uidx});

        const g26_continue = await this.gameDatabase.getGameLists('g26_continue');

        let ret_user_game_info = await this.common.setUserGameInfo(Dbnum, Uidx, 'COIN', -g26_continue[continueId]['Cost'], 'FREE');
        /*
        let coin = user_game_info[0]['Coin'] - g26_continue[continueId]['Cost'];

        if(coin < 0){
            throw new HttpException(
                {
                    status : 33,
                    message : 'Not enough Coin.',
                },
                HttpStatus.NOT_FOUND,
            );
        }

        await this.common.addReward(Dbnum, Uidx, 'COIN', 0, -g26_continue[continueId]['Cost']);

        user_game_info[0]['Coin'] = coin;
        */
        let ret = {};

        ret['user_game_info'] = this.common.user_game_info_ret(ret_user_game_info[0]);

        return ret;
    }

    async useItem(useItemDto: UseItemDto) {
        let nowTimestamp = Date.now() / 1000 | 0;

        const Uid = useItemDto.Uid;
        const Usn = useItemDto.Usn;
        const Deviceuuid = useItemDto.Deviceuuid;
        const useItemNo = useItemDto.useItemNo;

        // 중복접속 체크
        await this.common.check_overlap_device(Usn, Deviceuuid);

        const user_gate = await this.gateDatabase.get_user_gate_cache(Uid, Usn);
        const Uidx = user_gate.Uidx;
        const Dbnum = user_gate.Dbnum;

        const g22_item = await this.gameDatabase.getGameLists('g22_item');

        // Timer Item Check
        let check_timer_item = await this.userDatabase.getTimerList('user_timer', 1, 1000005, nowTimestamp);
        let item_already_use = 0;

        Object.entries(check_timer_item).forEach(async ([key, value], index) => {
            let remove_id2 = value['Use_Value'];

            if(remove_id2 == useItemNo){
                item_already_use = 1;   
            }
        });

        // 이미 Timer 로 사용중인 아이템
        if(item_already_use == 1){
            throw new HttpException(
                {
                    status : 23,
                    message : 'This item is already in use.',
                },
                HttpStatus.NOT_FOUND,
            );
        }

        let useItemCnt = await this.update_user_item(g22_item, nowTimestamp, useItemNo, Dbnum, Uidx, -1);

        let ret = {};
        ret['Id'] = useItemNo;
        ret['Cnt'] = useItemCnt;

        return ret;
    }

    async setTutorial(setTutorialDto: SetTutorialDto) {
        const Uid = setTutorialDto.Uid;
        const Usn = setTutorialDto.Usn;
        const Deviceuuid = setTutorialDto.Deviceuuid;
        const TutorialNo = setTutorialDto.TutorialNo;

        // 중복접속 확인
        await this.common.check_overlap_device(Usn, Deviceuuid);

        const user_gate = await this.gateDatabase.get_user_gate_cache(Uid, Usn);
        const Uidx = user_gate.Uidx;
        const Dbnum = user_gate.Dbnum;

        const user_info = await this.userDatabase.get("user_info", Dbnum, {"Uidx": Uidx});

        let tutorialStep = user_info[0]['Tutorialstep'];

        let tutorial = tutorialStep.toString().split(",");
        let tutorialArr = tutorial.map(Number);

        if(tutorialArr.includes(TutorialNo) == true){
            throw new HttpException(
                {
                    status : 22,
                    message : 'You have already completed the tutorial.',
                },
                HttpStatus.NOT_FOUND,
            );
        }
        
        const g93_tutorialtable = await this.gameDatabase.getGameLists('g93_tutorialtable');

        let reward = g93_tutorialtable[TutorialNo]['Reward_Type'];
        let ret_item_data = Object();
        ret_item_data.ret_item_data = [];
        ret_item_data.item_list = [];
        ret_item_data.collection_list = [];
        

        // 튜토리얼 리워드 지급
        if(reward == "REWARD_ID" || reward == "EPISODE_REWARD"){
            let reward_id = g93_tutorialtable[TutorialNo]['Reward_ID'];
            let reward_cnt = g93_tutorialtable[TutorialNo]['Reward_Count'];

            let addReward = [];
            if(reward == "REWARD_ID"){
                const g12_reward = await this.gameDatabase.getGameLists('g12_reward');
                addReward = await this.common.addRewardArr(g12_reward[reward_id]);
            }else{
                let user_episode_reward = await this.userDatabase.get('user_episode_reward', Dbnum, {"Uidx": Uidx, "EpisodeRwardId": reward_id});

                // 이미 보상을 지급 받았음.
                if(user_episode_reward.length != 0){
                    throw new HttpException(
                        {
                            status : 32,
                            message : 'You already received this reward.',
                        },
                        HttpStatus.NOT_FOUND,
                    );
                }
                const g20_episodemanager = await this.gameDatabase.getGameLists('g20_episodemanager');
                const g12_reward = await this.gameDatabase.getGameLists('g12_reward');

                let episode_reward_id = g20_episodemanager[reward_id]['Reward_Item'];
                addReward = await this.common.addRewardArr(g12_reward[episode_reward_id]);
                
                await this.userDatabase.add("user_episode_reward", Dbnum, {"Uidx": Uidx, "EpisodeRwardId": reward_id, "Episode_No": g20_episodemanager[reward_id]['Episode_No'], "Condition_Value": g20_episodemanager[reward_id]['Condition_Value']});
            }


            for(let n=0; n<reward_cnt; n++){
                let ret_item_data_sub = Object();

                [
                    ret_item_data_sub.ret_item_data, 
                    ret_item_data_sub.coin, 
                    ret_item_data_sub.stamina, 
                    ret_item_data_sub.item_list, 
                    ret_item_data_sub.collection_list
                ] = await this.common.newAddReward(Dbnum, Uidx, addReward);

                ret_item_data.ret_item_data = ret_item_data.ret_item_data.concat(ret_item_data_sub.ret_item_data);
                ret_item_data.item_list = ret_item_data.item_list.concat(ret_item_data_sub.item_list);
                ret_item_data.collection_list = ret_item_data.collection_list.concat(ret_item_data_sub.collection_list);
            }
        }

        tutorialArr.push(TutorialNo);

        await this.userDatabase.set('user_info', Dbnum, {"Uidx": Uidx}, {"Tutorialstep": tutorialArr.join()});

        let user_game_info = await this.userDatabase.get('user_game_info', Dbnum, {"Uidx": Uidx});

        let ret = {};

        ret['Tutorialstep'] = tutorialArr.join();
        ret['user_game_info'] = await this.common.user_game_info_ret(user_game_info);
        ret['user_item'] = ret_item_data.item_list;
        ret['user_collection'] = ret_item_data.collection_list;
        ret['reward_list'] = ret_item_data.ret_item_data;

        return ret;
    }

    async episodeReward(episodeRewardDto) {
        const Uid = episodeRewardDto.Uid;
        const Usn = episodeRewardDto.Usn;
        const Deviceuuid = episodeRewardDto.Deviceuuid;
        const EpisodeId = episodeRewardDto.EpisodeId;

        // 중복접속 확인
        await this.common.check_overlap_device(Usn, Deviceuuid);

        const user_gate = await this.gateDatabase.get_user_gate_cache(Uid, Usn);
        const Uidx = user_gate.Uidx;
        const Dbnum = user_gate.Dbnum;

        let user_episode_reward = await this.userDatabase.get('user_episode_reward', Dbnum, {"Uidx": Uidx, "EpisodeRwardId": EpisodeId});

        // 이미 받은 Reward 처리
        if(user_episode_reward.length != 0){
            throw new HttpException(
                {
                    status : 32,
                    message : 'You already received this reward.',
                },
                HttpStatus.NOT_FOUND,
            );
        }

        const g13_levelmanager = await this.gameDatabase.getGameLists('g13_levelmanager');
        const g20_episodemanager = await this.gameDatabase.getGameLists('g20_episodemanager');

        let user_game_info = await this.userDatabase.get('user_game_info', Dbnum, {"Uidx": Uidx});
        
        const Episode_No = g13_levelmanager[user_game_info[0]['Level']]['Episode_No'];
        const Order_List = g13_levelmanager[user_game_info[0]['Level']]['Order_List'];

        let is_reward = 0;

        if(Episode_No > g20_episodemanager[EpisodeId]['Episode_No']){
            is_reward = 1;
        }else if(Episode_No == g20_episodemanager[EpisodeId]['Episode_No'] && Order_List >= g20_episodemanager[EpisodeId]['Condition_Value']){
            is_reward = 1;
        }

        // 최종 전체 보상이면 자동 지급이기 때문에 해당 EpisodeId 가 들어오면 필터링 한다.
        // if(g20_episodemanager[EpisodeId]['Condition_Value'] == 0){
        //     is_reward = 0;
        // }

        if(is_reward == 0){
            throw new HttpException(
                {
                    status : 25,
                    message : 'There is no reward to receive1.',
                },
                HttpStatus.NOT_FOUND,
            );
        }else{
            let addReward = [];
            let ret_item_data = [];
            let in_params = [];
            let in_collection = [];

            const g12_reward = await this.gameDatabase.getGameLists('g12_reward');

            // 최종 전체 보상이면 자동 지급이기 때문에 해당 EpisodeId 가 들어오면 필터링 한다.
            if(g20_episodemanager[EpisodeId]['Condition_Value'] == 0){
                let episode_count = await this.userDatabase.getCount('user_episode_reward', Dbnum, {"Uidx": Uidx, "Episode_No": g20_episodemanager[EpisodeId]['Episode_No']});
                let detail_episode = await this.gameDatabase.getGameListsDetail('g20_episodemanager', 'Episode_No', g20_episodemanager[EpisodeId]['Episode_No']);

                is_reward = 0;

                if(episode_count != (detail_episode.length - 1)){
                    throw new HttpException(
                        {
                            status : 25,
                            message : 'There is no reward to receive2.',
                        },
                        HttpStatus.NOT_FOUND,
                    );
                }
            }

            let episode_reward_id = g20_episodemanager[EpisodeId]['Reward_Item'];
            addReward = await this.common.addRewardArr(g12_reward[episode_reward_id]);

            let ret_reward = Object();
            let ret_List = Object();

            [
                ret_reward.ret_item_data, 
                ret_reward.coin, 
                ret_reward.stamina, 
                ret_reward.item_list, 
                ret_reward.collection_list
            ] = await this.common.newAddReward(Dbnum, Uidx, addReward);
            
            await this.userDatabase.add("user_episode_reward", Dbnum, {"Uidx": Uidx, "EpisodeRwardId": EpisodeId, "Episode_No": g20_episodemanager[EpisodeId]['Episode_No'], "Condition_Value": g20_episodemanager[EpisodeId]['Condition_Value']});

            // let episode_count = await this.userDatabase.getCount('user_episode_reward', Dbnum, {"Uidx": Uidx, "Episode_No": g20_episodemanager[EpisodeId]['Episode_No']});
            // let detail_episode = await this.gameDatabase.getGameListsDetail('g20_episodemanager', 'Episode_No', g20_episodemanager[EpisodeId]['Episode_No']);

            // // 최종 다이어리 보상 지급
            // if((episode_count + 1) == detail_episode.length){
            //     for await (const final_reward of detail_episode){
            //         if(final_reward['Condition_Value'] == 0){
            //             addReward = await this.common.addRewardArr(g12_reward[final_reward['Reward_Item']]);
            //             let final_ret_reward = Object();

            //             [final_ret_reward.ret_item_data, final_ret_reward.coin, final_ret_reward.stamina, final_ret_reward.item_list, final_ret_reward.collection_list] = await this.common.newAddReward(Dbnum, Uidx, addReward);

            //             await this.userDatabase.add("user_episode_reward", Dbnum, {"Uidx": Uidx, "EpisodeRwardId": final_reward['Id'], "Episode_No": final_reward['Episode_No'], "Condition_Value": final_reward['Condition_Value']});

            //             ret_reward.ret_item_data = ret_reward.ret_item_data.concat(final_ret_reward.ret_item_data);
            //             ret_reward.item_list = ret_reward.item_list.concat(final_ret_reward.item_list);
            //             ret_reward.collection_list = ret_reward.collection_list.concat(final_ret_reward.collection_list);
            //         }
            //     }
            // }

            let user_game_info = await this.userDatabase.get('user_game_info', Dbnum, {"Uidx": Uidx});

            let ret = {};

            ret['user_game_info'] = await this.common.user_game_info_ret(user_game_info);
            ret['user_item'] = ret_reward.item_list;
            ret['user_collection'] = ret_reward.collection_list;
            ret['reward_list'] = ret_reward.ret_item_data;

            return ret;
        }
    }

    async set_stamina(Uidx: number, Dbnum: number, user_stamina:number, cnt: number) {
        const option_table = await this.gameDatabase.getGameLists('g90_option');
        const StaminaBasicValue = Number(option_table['StaminaBasicValue']['Option_Value']);

        let update_stamina = user_stamina + cnt;

        let nowTimestamp = Date.now() / 1000 | 0;
        await this.userDatabase.set("user_game_info", Dbnum, {"Uidx": Uidx}, {"Stamina": update_stamina, "StaminaLastChrgeTime": nowTimestamp});

        if(update_stamina < StaminaBasicValue) {
            let key = "last_stamina_charge:" + Uidx;
            await this.redisService.set(key, nowTimestamp);
        }

        return update_stamina;
    }
    
    // 스테미나 자동 충전
    //async stamina_charge(Uidx: number, Dbnum: number, cnt: number) {
    async stamina_charge(user_game_info: Object, Uidx: number, Dbnum: number, cnt: number) {
        let stamina = user_game_info[0]['Stamina'];

        const option_table = await this.gameDatabase.getGameLists('g90_option');
        const StaminaBasicValue = Number(option_table['StaminaBasicValue']['Option_Value']);
        const StaminaChargeTime = Number(option_table['StaminaChargeTime']['Option_Value']);

        let key = "last_stamina_charge:" + Uidx;

        if(StaminaBasicValue > stamina){
            let nowTimestamp = Date.now() / 1000 | 0;
            let last_charge_time = await this.redisService.get(key);

            if(last_charge_time === null){
                //await this.userDatabase.set("user_game_info", Dbnum, Uidx, {"Stamina": StaminaBasicValue, "StaminaLastChrgeTime": nowTimestamp});
                if(stamina < StaminaBasicValue){
                    await this.redisService.set(key, nowTimestamp);
                }

                return user_game_info[0];
            }else{
                let charge_time = Number(last_charge_time) + Number(StaminaChargeTime);
                let charge_stamina;

                if(nowTimestamp >= charge_time){
                    let remainder_time = nowTimestamp - last_charge_time;
                    charge_stamina = remainder_time / StaminaChargeTime;
                    let remainder_charge_time = remainder_time % StaminaChargeTime;
    
                    let total_stamina = stamina + Math.floor(charge_stamina) + cnt;
    
                    if(total_stamina >= StaminaBasicValue){
                        // charge_stamina = Number(StaminaBasicValue) + Number(cnt);

                        // if(charge_stamina > StaminaBasicValue){
                        //     await this.redisService.del(key);
                        // }
                        charge_stamina = Number(StaminaBasicValue);
                        await this.redisService.del(key);
                    }else{
                        charge_stamina = total_stamina;
                        let set_charge_timestamp = nowTimestamp - remainder_charge_time;

                        await this.redisService.set(key, set_charge_timestamp);
                    }
                }else{
                    charge_stamina = 0;
                }

                if(charge_stamina > 0){
                    await this.userDatabase.set("user_game_info", Dbnum, {"Uidx": Uidx}, {"Stamina": charge_stamina, "StaminaLastChrgeTime": nowTimestamp});
                }else{
                    charge_stamina = stamina;
                }

                user_game_info[0]['Stamina'] = charge_stamina;

                return user_game_info[0];
            }
        }else{
            await this.redisService.del(key);
            return user_game_info[0];
        }
    }

    async update_user_item(g22_item: Object, nowTimestamp: number, ItemNo: number, Dbnum: number, Uidx: number, Cnt:number) {
        let ReadyItemCnt = 0;

        let params;
        let set_time;

        let is_NotEnoughItem = 0;
        let useItem = await this.userDatabase.get('user_item', Dbnum, {"Uidx": Uidx, "Id": ItemNo});

        if(Object.keys(useItem).length == 0 || useItem[0]['Cnt'] < 0){
            let is_NotEnoughItem = 1;
        }

        ReadyItemCnt = useItem[0]['Cnt'] + Cnt;

        if(ReadyItemCnt < 0 || is_NotEnoughItem == 1){
            throw new HttpException(
                {
                    status : 33,
                    message : 'Not enough Item.',
                },
                HttpStatus.NOT_FOUND,
            );
        }
        console.log(g22_item[ItemNo]['Use_Time']);
        if(g22_item[ItemNo]['Use_Time'] == 0){
            params = {"Cnt": ReadyItemCnt}
        }else{
            // 타이머 아이템
            let user_timer = await this.userDatabase.getTimer('user_timer', Dbnum, Uidx, g22_item[ItemNo]['Item_Type'], nowTimestamp);

            params = {"Cnt": ReadyItemCnt}
            set_time = nowTimestamp + g22_item[ItemNo]['Use_Time'];

            if(Object.keys(user_timer).length == 0){
                let add_params = {"Uidx": Uidx, "Item_Type": g22_item[ItemNo]['Item_Type'], "Use_Value": g22_item[ItemNo]['Use_Value'], "EndTime": set_time};
                console.log(add_params);
                
                await this.userDatabase.add('user_timer', Dbnum, add_params);
            }else{
                // 버프 아이템이 있으면 End 시간 확인
                if(user_timer[0]['EndTime'] > nowTimestamp){
                    // 버프가 활성화 되어 있으면 End 시간을 증가 시켜 준다.
                    set_time = user_timer[0]['EndTime'] + g22_item[ItemNo]['Use_Time'];
                }

                let set_params = {"Use_Value": g22_item[ItemNo]['Use_Value'], "EndTime": set_time};
                await this.userDatabase.set('user_timer', Dbnum, {"Uidx": Uidx, "Item_Type": g22_item[ItemNo]['Item_Type']},set_params);
            }
        }
        await this.userDatabase.set('user_item' , Dbnum, {"Uidx": Uidx, "Id": ItemNo}, params);

        return ReadyItemCnt;
    }
}
