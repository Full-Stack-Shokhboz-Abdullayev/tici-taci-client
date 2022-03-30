import { FC, useCallback, useEffect, useReducer, useState } from 'react';
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
import Loading from './design/Loading';
import JoinGameForm from './JoinGame/JoinGameForm';
import Message from './Playground/Message';
import Square from './Square';

const Playground: FC<PlaygroundProps> = ({ className }) => {
  const { players, join, code: storedCode, check, opponentLeft } = useGameStore();
  const [{ cells, line, winner, xIsNext }, playgroundDispatch] = useReducer(
    playgroundReducer,
    defaultPlaygroundState,
  );
  const socket = useSocket();
  const { code } = useParams() as { code: string };
  const { open } = useModal(<JoinGameForm />);

  const [canMove, setCanMove] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (socket) {
      socket?.on('opponent-left', (game: JoinGameDto) => {
        opponentLeft(game);
        playgroundDispatch({ type: 'start' });
      });
      socket?.on('move-complete', (state: PlaygroundState) => {
        playgroundDispatch({ type: 'move', payload: state });
        setCanMove(true);
      });
      socket?.on('restart-made', () => {
        playgroundDispatch({ type: 'start' });
      });
      socket?.on('check-complete', (game: JoinGameDto | { error: boolean }) => {
        if (game && !(game as { error: boolean }).error) {
          check(game as JoinGameDto);
          open();
          return;
        }

        navigate('/');
      });
      socket?.on('player-joined', (game: JoinGameDto) => {
        join(game.joiner);
      });
      if (!storedCode) {
        socket?.emit('check', { code });
        console.log('checking', socket);
      }
    }
  }, [socket, storedCode, canMove]);

  const mark = useCallback(
    (i: number) => {
      if (!winner && !cells[i] && canMove) {
        playgroundDispatch({
          type: 'mark',
          payload: {
            idx: i,
            localSign: players.local?.sign,
          },
        });
        socket?.emit('move', {
          code,
          idx: i,
          cells,
          xIsNext,
        });
        setCanMove(false);
      }
    },
    [socket, cells, playgroundDispatch, canMove],
  );

  const restart = useCallback(() => {
    if (winner) {
      socket?.emit('restart', { code });
      playgroundDispatch({
        type: 'start',
      });
    }
  }, [playgroundDispatch, storedCode, winner]);

  return (
    <div className={`${className} playground-container`}>
      <div className="relative ">
        {(!players.remote ||
          ((players.local?.sign === 'O' ? xIsNext : !xIsNext) && !winner && canMove)) && (
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

      <Message xIsNext={xIsNext} winner={winner} restart={restart} players={players} />
    </div>
  );
};

export default Playground;
