import { defaultPlaygroundState } from '../constants/Playground';
import { PlaygroundState } from '../typings/Playground/interfaces/index.interfaces';
import { ReducerAction } from '../typings/Playground/interfaces/reducer.interfaces';

export const playgroundReducer = (state: PlaygroundState, action: ReducerAction) => {
  switch (action.type) {
    case 'start':
      if (state.winner) {
        (action.payload as any).socket?.emit('restart', {
          code: (action.payload as any).code,
        });

        return defaultPlaygroundState;
      }
      return state;
    case 'force-start':
      return defaultPlaygroundState;
    case 'mark': {
      if (
        !state.winner &&
        !state.cells[action.payload?.idx] &&
        state.canMove &&
        (action.payload as any).socket
      ) {
        const cells = [...state.cells];
        cells[action.payload?.idx] = action.payload?.localSign;

        (action.payload as any).socket?.emit('move', {
          code: (action.payload as any).code,
          idx: (action.payload as any).idx,
          cells,
          xIsNext: state.xIsNext,
        });

        return {
          ...state,
          cells,
          canMove: action.payload?.canMove,
        };
      }
      return state;
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
