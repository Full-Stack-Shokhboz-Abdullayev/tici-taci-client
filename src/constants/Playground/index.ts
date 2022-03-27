import {
  PlayersState,
  PlaygroundState,
} from '../../typings/Playground/interfaces/index.interfaces';

export const defaultPlaygroundState: PlaygroundState = {
  cells: Array(9).fill(null),
  xIsNext: true,
  winner: null,
  line: {},
};

export const defaultPlayers: PlayersState = {
  local: {
    name: 'Shokhboz',
    sign: 'X',
  },
  remote: {
    name: 'Computer',
    sign: 'O',
  },
};
