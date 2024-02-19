import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { Expose } from "class-transformer";

/**
 * @description SRP를 위반하는 구조이지만 테스트용으로 한 파일에 두 클래스를 선언했다.
 *
 * SRP란: 한 클래스는 하나의 책임만 가져야한다. (단일 책임의 원칙)
 */

export class CheckUserDto {
  @IsNumber()
  @IsNotEmpty()
  Acounttype: number; // 1 - Guest, 2 - Google, 3 - Facebook

  @IsString()
  @IsNotEmpty()
  Accesstoken: string; // google, Facebook : Access_token , Guest : device_uuid

  @IsString()
  @IsNotEmpty()
  Deviceuuid: string; // 디바이스 UUID

  @IsOptional()
  Usn: string; // 디바이스 USN
}

export class UserJoinDto {
  @IsNumber()
  @IsNotEmpty()
  Os: number; // 1 - android , 2 - ios, 3 - etc

  @IsNumber()
  @IsNotEmpty()
  Acounttype: number; // 1 - Guest, 2 - Google, 3 - Facebook

  @IsString()
  @IsNotEmpty()
  Deviceuuid: string; // 디바이스 UUID

  @IsOptional()
  Accesstoken: string; // google, Facebook : Access_token , Guest : device_uuid

  @IsOptional()
  Country: string; // google, Facebook : Access_token , Guest : device_uuid

  @IsOptional()
  InviteCode: number; // google, Facebook : Access_token , Guest : device_uuid
}

export class retCheckJoinDto {
  @Expose()
  Uid: string; // User ID

  @Expose()
  Usn: string; // USN

  @Expose()
  Deviceuuid: string; // 디바이스 UUID
}

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  Uid: string; // User ID

  @IsString()
  @IsNotEmpty()
  Usn: string; // USN

  @IsString()
  @IsNotEmpty()
  Deviceuuid: string; // 디바이스 UUID
}

export class LevelStartDto {
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
  ReadyItemNo1: number; // 시작 아이템 1

  @IsNumber()
  @IsNotEmpty()
  ReadyItemNo2: number; // 시작 아이템 2

  @IsNumber()
  @IsNotEmpty()
  ReadyItemNo3: number; // 시작 아이템 3
}

export class LevelEndDto {
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
  ClearLevel: number; // g24_gather_contetnts 참고

  @IsNumber()
  @IsNotEmpty()
  IsClear: number; // Level Clear 여부 (1-성공, 2-실패)

  @IsNumber()
  @IsNotEmpty()
  Target_Value: number; // g24_gather_contetnts 참고
}

export class SetContinueDto {
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
  Id: number; // g26_continue 참고
}

export class SetTutorialDto {
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
  TutorialNo: number; // 튜토리얼 번호
}

export class UseItemDto {
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
  useItemNo: number; // 튜토리얼 번호
}

export class EpisodeRewardDto {
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
  EpisodeId: number; // 튜토리얼 번호
}
//$os, $Acounttype, $usn, $NickName, $Country, $device_uuid, $device_token, $access_token = "", $invite_code = "", $is_debug = 0