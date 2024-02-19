import { 
    /*
    Delete,
    Get,
    Param,
    Patch,
    Put,
    Query,
    ParseIntPipe,
    DefaultValuePipe,
    */
    Post,
    UsePipes,
    ValidationPipe,
    Body,
    Controller,
 } from '@nestjs/common';
import { UserService } from './user.service';
import { Serialize } from '../../common/dataReturn/serialize.interceptor'
import {
    CheckUserDto,
    UserJoinDto,
    UserLoginDto,
    LevelStartDto,
    LevelEndDto,
    retCheckJoinDto,
    SetTutorialDto,
    UseItemDto,
    SetContinueDto,
    EpisodeRewardDto,
} from './dto/userDto.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post('/checkUser')
    @Serialize(retCheckJoinDto)
    //@UsePipes(ValidationPipe)
    async checkUser(@Body() checkUserDto: CheckUserDto) {
        return await this.userService.checkUser(checkUserDto);
    }

    @Post('/userJoin')
    @Serialize(retCheckJoinDto)
    async userJoin(@Body() userJoinDto: UserJoinDto) {
        return await this.userService.userJoin(userJoinDto);
    }

    @Post('/loginBonus')
    async loginBonus(@Body() userLoginDto: UserLoginDto) {
        return await this.userService.loginBonus(userLoginDto);
    }

    @Post('/userLogin')
    async userLogin(@Body() userLoginDto: UserLoginDto) {
        return await this.userService.userLogin(userLoginDto);
    }

    @Post('/levelStart')
    async levelStart(@Body() levelStartDto: LevelStartDto) {
        return await this.userService.levelStart(levelStartDto);
    }

    @Post('/levelEnd')
    async levelEnd(@Body() levelEndDto: LevelEndDto) {
        return await this.userService.levelEnd(levelEndDto);
    }

    @Post('/setContinue')
    async setContinue(@Body() setContinueDto: SetContinueDto) {
        return await this.userService.setContinue(setContinueDto);
    }

    @Post('/setGatherContents')
    async setGatherContents(@Body() userLoginDto: UserLoginDto) {
        return await this.userService.setGatherContents(userLoginDto);
    }

    @Post('/setTutorial')
    async setTutorial(@Body() setTutorialDto: SetTutorialDto) {
        return await this.userService.setTutorial(setTutorialDto);
    }

    @Post('/useItem')
    async useItem(@Body() useItemDto: UseItemDto) {
        return await this.userService.useItem(useItemDto);
    }

    @Post('/episodeReward')
    async episodeReward(@Body() episodeRewardDto: EpisodeRewardDto) {
        return await this.userService.episodeReward(episodeRewardDto);
    }

    @Post('/getTest')
    async getTest(@Body() userLoginDto: UserLoginDto) {
        return await this.userService.getTest();
    }
}
