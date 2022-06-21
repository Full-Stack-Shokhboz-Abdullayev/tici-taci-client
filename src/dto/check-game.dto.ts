import { IsString, IsUUID } from 'class-validator';

export class CheckGameDto {
  @IsString()
  @IsUUID(4, {
    message: 'Game code is not valid',
  })
  code = '';
}
