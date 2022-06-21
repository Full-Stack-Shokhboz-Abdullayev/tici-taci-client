import { PlayerDto } from './player.type';

export type CreateGame = {
  title: string;
  code: string;
  maker: PlayerDto;
};
