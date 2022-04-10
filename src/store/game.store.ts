import create from 'zustand';

import { PlayersState } from '../typings/Playground/interfaces/index.interfaces';
import { PlayerType } from '../typings/Playground/types/player.type';
import { CreateGameDto } from '../typings/shared/dto/create-game.dto';
import { JoinGameDto } from '../typings/shared/dto/join-game.dto';
import { PlayerDto } from '../typings/shared/dto/player.dto';
import { Nullish } from '../typings/shared/types/nullish.type';

interface State {
  title: Nullish<string>;
  code: Nullish<string>;
  players: Partial<PlayersState>;
}

type Scores = { [key: string]: number };

interface Actions {
  create: (payload: CreateGameDto) => void;
  join: (player: PlayerDto) => void;
  check: (game: Partial<JoinGameDto>) => void;
  opponentLeft: (game: Partial<JoinGameDto>) => void;
  updateScores(scores: Scores): void;
  empty: () => void;
}

const useGameStore = create<State & Actions>((set) => ({
  title: '',
  code: '',
  players: {},

  async create({ title, maker: { sign, name, score }, code }) {
    set((state) => {
      return {
        ...state,
        title,
        code,
        players: {
          ...state.players,
          local: {
            name,
            sign,
            score,
          },
        },
      };
    });
  },

  async check({ code, joiner, maker, title }) {
    set((state) => {
      return {
        ...state,
        title,
        code,
        players: {
          ...state.players,
          local: joiner,
          remote: maker,
        },
      };
    });
  },

  empty() {
    set((state) => ({
      ...state,
      title: '',
      code: '',
      players: {},
    }));
  },

  opponentLeft({ code, joiner, maker, title }) {
    set((state) => {
      return {
        ...state,
        title,
        code,
        players: {
          local: maker,
          remote: joiner,
        },
      };
    });
  },

  join(player) {
    set((state) => ({
      ...state,
      players: {
        ...state.players,
        remote: {
          ...player,
        },
      },
    }));
  },

  updateScores(scores) {
    set((state) => {
      if (state.players.local?.name && state.players.remote?.name) {
        const players = {} as PlayersState;

        Object.keys(state.players).forEach((key) => {
          players[key as PlayerType] = {
            ...(state.players[key as PlayerType] as PlayerDto),
            score: scores[(state.players[key as PlayerType] as PlayerDto).name],
          } as PlayerDto;
        });

        return { ...state, players };
      }
      return state;
    });
  },
}));

export default useGameStore;
