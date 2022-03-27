import { PlayerDto } from './player.dto';

export type CreateGameDto = {
  title: string;
  code: string;
  maker: PlayerDto;
};
