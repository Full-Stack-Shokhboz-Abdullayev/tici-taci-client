import { IsNotEmpty, IsString } from 'class-validator';

export class JoinerDto {
  @IsString()
  @IsNotEmpty()
  name = '';
}
