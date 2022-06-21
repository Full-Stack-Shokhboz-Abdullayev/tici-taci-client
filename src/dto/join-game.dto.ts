import { IsNotEmpty, IsString } from 'class-validator';

export class JoinGameFormDto {
  @IsString()
  @IsNotEmpty({
    message: 'Player name is required',
  })
  name = '';
}
