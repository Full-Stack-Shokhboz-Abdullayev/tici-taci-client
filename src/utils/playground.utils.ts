import { defaultPlaygroundState } from '../constants/Playground';
import { PlaygroundState } from '../typings/Playground/interfaces/index.interfaces';
import { ReducerAction } from '../typings/Playground/interfaces/reducer.interfaces';

export const playgroundReducer = (state: PlaygroundState, action: ReducerAction) => {
  switch (action.type) {
    case 'start':
      return defaultPlaygroundState;
    case 'mark': {
      const cells = [...state.cells];
      cells[action.payload?.idx] = action.payload?.localSign;
      return {
        ...state,
        cells,
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
