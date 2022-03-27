import O from '../assets/images/o.svg';
import X from '../assets/images/x.svg';
import { defaultPlaygroundState } from '../constants/Playground';
import { PlaygroundState } from '../typings/Playground/interfaces/index.interfaces';
import { ReducerAction } from '../typings/Playground/interfaces/reducer.interfaces';
import calculateWinner from './calculate-winner';

export const playgroundReducer = (state: PlaygroundState, action: ReducerAction) => {
  switch (action.type) {
    case 'start':
      return defaultPlaygroundState;
    case 'mark': {
      if (state.winner || state.cells[action.payload?.idx]) {
        return state;
      }
      const moves = [...state.cells];
      moves[action.payload?.idx] = state.xIsNext ? X : O;
      const {
        winner,
        line: { line },
      } = calculateWinner(moves);

      return {
        winner,
        line: winner && winner !== 'tie' ? line : {},
        cells: moves,
        xIsNext: !state.xIsNext,
      };
    }
    case 'move': {
      return {
        ...state,
        ...(action.payload as PlaygroundState),
      };
    }
    default:
      return state;
  }
};

// maker creates game and waits with loading...
// ⬇
// joiner joins game
// ⬇
// maker's turn to make move (joiner is waiting)
// ⬇
// joiner's turn to make move (maker is waiting)
// ⬇
// ⬇
// ⬇
// someone wins and then game is closed
