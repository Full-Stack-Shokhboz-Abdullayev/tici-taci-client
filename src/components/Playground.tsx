import { FC, useCallback, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { defaultPlaygroundState } from '../constants/Playground';
import { useSocket } from '../contexts/SocketProvider';
import useModal from '../hooks/useModal';
import useGameStore from '../store/game.store';
import {
  PlaygroundProps,
  PlaygroundState,
} from '../typings/Playground/interfaces/index.interfaces';
import { JoinGameDto } from '../typings/shared/dto/join-game.dto';
import { playgroundReducer } from '../utils/playground.utils';
import JoinGameForm from './JoinGame/JoinGameForm';
import Fallback from './Playground/Fallback';
import Message from './Playground/Message';
import SquaresGrid from './Playground/SquaresGrid';

const Playground: FC<PlaygroundProps> = ({ className }) => {
  const { join, check, opponentLeft, updateScores, code: storedCode } = useGameStore();

  const players = useGameStore(({ players }) => players);

  const [{ cells, line, winner, xIsNext, canMove }, dispatch] = useReducer(
    playgroundReducer,
    defaultPlaygroundState,
  );
  const socket = useSocket();
  const { code } = useParams() as { code: string };
  const { open } = useModal(<JoinGameForm />);

  const navigate = useNavigate();

  useEffect(() => {
    if (socket) {
      const socketEventHandlers: {
        [key: string]: (data: any) => void;
      } = {
        'opponent-left': (game: JoinGameDto) => {
          opponentLeft(game);
          dispatch({ type: 'force-start' });
        },
        'move-complete': ({ scores, ...state }: PlaygroundState) => {
          dispatch({ type: 'move', payload: { ...state, canMove: true } });
          updateScores(scores);
        },
        'restart-made': () => {
          dispatch({ type: 'force-start' });
        },
        'check-complete': (game: JoinGameDto | { error: boolean }) => {
          if (
            game &&
            !(game as { error: boolean }).error &&
            !(game as JoinGameDto).joiner
          ) {
            check(game as JoinGameDto);
            open();
            return;
          }

          navigate('/');
        },
        'player-joined': (game: JoinGameDto) => {
          join(game.joiner);
        },
      };
      Object.keys(socketEventHandlers).forEach((event) => {
        socket?.on(event, socketEventHandlers[event]);
      });

      if (!storedCode) {
        socket?.emit('check', { code });
      }
      return () => {
        Object.keys(socketEventHandlers).forEach((event) => {
          socket?.off(event, socketEventHandlers[event]);
        });
      };
    }
  }, [socket, storedCode, dispatch]);

  const mark = useCallback(
    (i: number) => {
      const localSign = players.local?.sign
        ? players.local.sign
        : players.remote?.sign === 'X'
        ? 'O'
        : 'X';
      console.log('LocalSign', localSign);

      dispatch({
        type: 'mark',
        payload: {
          idx: i,
          localSign,
          canMove: false,
          socket,
          code: storedCode,
        },
      });
    },
    [socket, storedCode, dispatch],
  );

  const restart = useCallback(() => {
    dispatch({
      type: 'start',
      payload: { socket, code: storedCode },
    });
  }, [socket, storedCode, dispatch]);

  return (
    <div className={`${className} playground-container`}>
      <div className="relative">
        <Fallback canMove={canMove} players={players} xIsNext={xIsNext} winner={winner} />
        <SquaresGrid line={line} onClick={mark} squares={cells} />
      </div>

      <Message xIsNext={xIsNext} winner={winner} restart={restart} players={players} />
    </div>
  );
};

export default Playground;
