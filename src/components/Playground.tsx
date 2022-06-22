import { FC, useCallback, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { defaultPlaygroundState } from '../constants/Playground';
import { useSocket } from '../contexts/SocketProvider';
import useModal from '../hooks/useModal';
import { playgroundReducer } from '../reducers/playground.reducer';
import useGameStore from '../store/game.store';
import {
  PlaygroundProps,
  PlaygroundState,
} from '../typings/Playground/interfaces/index.interfaces';
import { JoinGame } from '../typings/shared/types/join-game.type';
import JoinGameForm from './JoinGame/JoinGameForm';
import Fallback from './Playground/Fallback';
import Message from './Playground/Message';
import SquaresGrid from './Playground/SquaresGrid';

const Playground: FC<PlaygroundProps> = ({ className }) => {
  const { join, check, opponentLeft, updateScores, code: storedCode } = useGameStore();

  const players = useGameStore(({ players }) => players);

  const [{ cells, line, winner, xIsNext, canMove }, dispatch] = useReducer(
    playgroundReducer,
    defaultPlaygroundState(true),
  );
  const socket = useSocket();
  const { code } = useParams() as { code: string };
  const navigate = useNavigate();
  const { open } = useModal(<JoinGameForm />, {
    onClose(): void {
      navigate(`/`);
    },
  });

  useEffect(() => {
    const socketEventHandlers: {
      [key: string]: (data: any) => void;
    } = {
      'opponent-left': (game: JoinGame) => {
        opponentLeft(game);
        dispatch({ type: 'start' });
      },
      'move-complete': ({ scores, ...state }: PlaygroundState) => {
        dispatch({ type: 'move', payload: { ...state, canMove: true } });
        updateScores(scores);
      },
      'restart-made': ({ xIsNext }: { xIsNext: boolean }) => {
        dispatch({ type: 'start', payload: { xIsNext } });
      },
      'check-complete': (game: JoinGame | { error: boolean }) => {
        if (game && !(game as { error: boolean }).error && !(game as JoinGame).joiner) {
          check(game as JoinGame);
          dispatch({
            type: 'flip',
            payload: {
              xIsNext: (game as JoinGame).flip,
            },
          });
          open();
          return;
        }

        navigate('/');
      },
      'player-joined': (game: JoinGame) => {
        join(game.joiner);
        dispatch({
          type: 'flip',
          payload: {
            xIsNext: game.flip,
          },
        });
      },
    };
    Object.keys(socketEventHandlers).forEach((event) => {
      socket.on(event, socketEventHandlers[event]);
    });

    if (!storedCode) {
      socket.emit('check', { code });
    }
    return () => {
      Object.keys(socketEventHandlers).forEach((event) => {
        socket.off(event, socketEventHandlers[event]);
      });
    };
  }, [storedCode, dispatch]);

  const mark = useCallback(
    (i: number) => {
      const localSign = players.local?.sign
        ? players.local.sign
        : players.remote?.sign === 'X'
        ? 'O'
        : 'X';

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
    [storedCode, dispatch],
  );

  const restart = useCallback(() => {
    socket.emit('restart', {
      code: storedCode,
    });
  }, [storedCode]);

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
