import { defaultPlaygroundState } from '../constants/Playground';
import { PlaygroundState } from '../typings/Playground/interfaces/index.interfaces';
import { ReducerAction } from '../typings/Playground/interfaces/reducer.interfaces';

export const playgroundReducer = (state: PlaygroundState, action: ReducerAction) => {
  switch (action.type) {
    case 'start':
      return defaultPlaygroundState(action.payload?.xIsNext);
    case 'mark': {
      if (
        !state.winner &&
        !state.cells[action.payload?.idx] &&
        state.canMove &&
        (action.payload as any).socket
      ) {
        const cells = [...state.cells];
        cells[action.payload?.idx] = action.payload?.localSign;

        (action.payload as any).socket.emit('move', {
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
    case 'flip':
      console.log('fliiip');

      return {
        ...state,
        xIsNext: (action.payload as Pick<PlaygroundState, 'xIsNext'>).xIsNext,
      };
    default:
      return state;
  }
};
