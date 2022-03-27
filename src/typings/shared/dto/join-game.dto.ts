import { CreateGameDto } from './create-game.dto';
import { PlayerDto } from './player.dto';

export interface JoinGameDto extends CreateGameDto {
  joiner: PlayerDto;
}
