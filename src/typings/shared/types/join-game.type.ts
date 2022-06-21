import { CreateGame } from './create-game.type';
import { PlayerDto } from './player.type';

export interface JoinGame extends CreateGame {
  joiner: PlayerDto;
}
