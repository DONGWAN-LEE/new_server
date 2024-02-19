import {
    // Inject,
    // Delete,
    // Param,
    // Patch,
    Post,
    // Put,
    // Query,
    // UsePipes,
    // ParseIntPipe,
    // ValidationPipe,
    // DefaultValuePipe,
    Body,
    Controller,
    //Get,
} from '@nestjs/common';

import { GameService } from './game.service';
import { Serialize } from '../../common/dataReturn/serialize.interceptor'
import { InitDto, retInitDto } from './dto/game.dto';


/*
@GET : 조회
@POST : 생성
@PATCH : 단일 수정
@PUT :  전체 수정
@DELETE : 삭제
*/

@Controller('game')
export class GameController {
    constructor(
        private readonly GameService: GameService,
    ) {}

    @Post('/init')
    @Serialize(retInitDto)
    init(@Body() initDto: InitDto): any {
        return this.GameService.init(initDto);
    }

    @Post('/getGameData')
    getGameData(): any {
        console.log('v1_0_4');
        return this.GameService.getGameData();
    }
}
