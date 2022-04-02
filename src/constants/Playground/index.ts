import { PlaygroundState } from '../../typings/Playground/interfaces/index.interfaces';

export const defaultPlaygroundState: PlaygroundState = {
  cells: Array(9).fill(null),
  xIsNext: true,
  winner: null,
  line: {},
  scores: {},
};
