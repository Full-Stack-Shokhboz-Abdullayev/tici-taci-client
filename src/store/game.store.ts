import create from 'zustand';

import useAxios from '../config/axios.config';
import { PlayersState } from '../typings/Playground/interfaces/index.interfaces';
import { CreateGameDto } from '../typings/shared/dto/create-game.dto';
import { JoinGameDto } from '../typings/shared/dto/join-game.dto';
import { PlayerDto } from '../typings/shared/dto/player.dto';
import { Nullish } from '../typings/shared/types/nullish.type';

interface State {
  title: Nullish<string>;
  code: Nullish<string>;
  players: Partial<PlayersState>;
}

interface Actions {
  create: (payload: CreateGameDto) => Promise<State>;
  join: (player: PlayerDto) => void;
  check: (game: Partial<JoinGameDto>) => Promise<void>;
  remove: (code: string) => Promise<void>;
  opponentLeft: (game: Partial<JoinGameDto>) => void;
}

const useGameStore = create<State & Actions>((set) => ({
  title: '',
  code: '',
  players: {},

  async create({ title, maker: { sign, name }, code }) {
    let updatedState: any;
    set((state) => {
      updatedState = {
        ...state,
        title,
        code,
        players: {
          ...state.players,
          local: {
            name,
            sign,
          },
        },
      };

      return updatedState;
    });
    return updatedState;
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

  opponentLeft({ code, joiner, maker, title }) {
    // joiner left -> joiner = null
    // maker left -> maker = joiner -> joiner = null
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

  async remove(code: string) {
    await useAxios.delete('/game?code=' + code).catch(console.log);
    set((state) => ({
      ...state,
      title: '',
      code: '',
      players: {},
    }));
  },
}));

export default useGameStore;
