import { PlayerDto } from '../../shared/dto/player.dto';
import { Nullish } from '../../shared/types/nullish.type';
import { PlayerType } from '../types/player.type';
import { Line } from './calculate-winner.interfaces';

export interface PlaygroundProps {
  className?: string;
}

export type PlayersState = Record<PlayerType, PlayerDto>;
export interface PlaygroundState {
  cells: Array<Nullish<string>>;
  xIsNext: boolean;
  winner: Nullish<string>;
  line: Partial<Line['line']>;
}
