import { FC, useCallback, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';

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
import Loading from './design/Loading';
import JoinGameForm from './JoinGame/JoinGameForm';
import Message from './Playground/Message';
import Square from './Square';

const Playground: FC<PlaygroundProps> = ({ className }) => {
  const { players, join, code: storedCode, check } = useGameStore();
  const [{ cells, line, winner, xIsNext }, playgroundDispatch] = useReducer(
    playgroundReducer,
    defaultPlaygroundState,
  );
  const socket = useSocket();
  const { code } = useParams() as { code: string };
  const { open } = useModal(<JoinGameForm />);

  useEffect(() => {
    socket?.on('move-complete', (state: PlaygroundState) => {
      console.log(state);

      playgroundDispatch({ type: 'move', payload: state });
    });
    if (storedCode) {
      socket?.on('player-joined', (game: JoinGameDto) => {
        join(game.joiner);
      });
      socket?.on('disconnect', () => {
        socket.emit('leave', { code });
      });
    } else {
      socket?.on('check-complete', (game: JoinGameDto) => {
        if (game) {
          check(game);
          open();
        }
      });
      socket?.emit('check', { code });
    }
  }, [socket]);

  const mark = useCallback(
    (i: number) => {
      if (!winner && !cells[i]) {
        socket?.emit('move', {
          code,
          idx: i,
          cells,
          xIsNext,
        });
      }
    },
    [cells, socket],
  );

  const restart = useCallback(() => {
    playgroundDispatch({
      type: 'start',
    });
  }, [playgroundDispatch]);

  return (
    <div className={`${className} playground-container`}>
      <div className="relative ">
        {(!players.remote ||
          ((players.local?.sign === 'O' ? xIsNext : !xIsNext) && !winner)) && (
          <div className="flex justify-center items-center absolute w-full h-full z-30 bg-opacity-80 bg-white">
            <Loading show={true} />
          </div>
        )}
        <div
          className={`playground-content relative grid grid-cols-3 grid-rows-3 line-${line.perspective} line-${line.position}`}
        >
          {cells.map((value, i) => (
            <Square value={value} onClick={mark} index={i} key={i} />
          ))}
        </div>
      </div>
      {!players.remote && <p className="text-center">Waiting for the opponent to join</p>}
      <Message winner={winner} restart={restart} players={players} />
    </div>
  );
};

export default Playground;
