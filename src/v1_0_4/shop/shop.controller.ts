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
import { ShopService } from './shop.service';
import { Serialize } from '../../common/dataReturn/serialize.interceptor'
import {
    ShopListDto,
    ShopBuyDto,
} from './dto/shopDto.dto';

@Controller('shop')
export class ShopController {
    constructor(
        private readonly shopService: ShopService
    ) {}

    @Post('/shopList')
    async shopList(@Body() shopListDto: ShopListDto) {
        return await this.shopService.shopList(shopListDto);
    }

    @Post('/shopBuy')
    async shopBuy(@Body() shopBuyDto: ShopBuyDto) {
        return await this.shopService.shopBuy(shopBuyDto);
    }
}
