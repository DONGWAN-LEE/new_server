import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { Expose } from "class-transformer";

/**
 * @description SRP를 위반하는 구조이지만 테스트용으로 한 파일에 두 클래스를 선언했다.
 *
 * SRP란: 한 클래스는 하나의 책임만 가져야한다. (단일 책임의 원칙)
 */

export class ShopListDto {
  @IsString()
  @IsNotEmpty()
  Uid: string; // User ID

  @IsString()
  @IsNotEmpty()
  Usn: string; // USN

  @IsString()
  @IsNotEmpty()
  Deviceuuid: string; // 디바이스 UUID

  @IsNumber()
  @IsNotEmpty()
  Group_No: Number;
}

export class ShopBuyDto {
  @IsString()
  @IsNotEmpty()
  Uid: string; // User ID

  @IsString()
  @IsNotEmpty()
  Usn: string; // USN

  @IsString()
  @IsNotEmpty()
  Deviceuuid: string; // 디바이스 UUID

  @IsNumber()
  @IsNotEmpty()
  ShopId: Number;
}