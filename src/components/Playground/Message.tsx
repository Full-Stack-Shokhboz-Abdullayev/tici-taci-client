import { FC, memo, useMemo } from 'react';

import { PlayersState } from '../../typings/Playground/interfaces/index.interfaces';
import { PlayerType } from '../../typings/Playground/types/player.type';
import { Nullish } from '../../typings/shared/types/nullish.type';
import Button from '../core/design/Button';

interface MessageProps {
  winner: Nullish<string>;
  restart: () => void;
  players: Partial<PlayersState>;
  xIsNext: boolean;
}

const findKeyBySign = (players: PlayersState, value: string) => {
  return Object.keys(players).find((key) => {
    return players[key as PlayerType].sign === value;
  });
};

const Message: FC<MessageProps> = ({ winner, restart, players, xIsNext }) => {
  if (!players.remote) {
    return (
      <p className="text-center">
        {!players.remote && 'Waiting for the opponent to join'}
      </p>
    );
  } else if (!winner && players.local) {
    const whoseTurn = useMemo(() => {
      const playerType = findKeyBySign(
        players as PlayersState,
        xIsNext ? 'X' : 'O',
      ) as PlayerType;
      if (playerType) {
        return players[playerType]?.name;
      }
      return '';
    }, [players, xIsNext]);

    return (
      <p className="text-center">
        Now turn to <span className="font-bold">{whoseTurn}</span>
      </p>
    );
  } else if (winner) {
    const winnerPlayer = useMemo(() => {
      const winnerType = findKeyBySign(players as PlayersState, winner) as PlayerType;
      if (winnerType) {
        return players[winnerType]?.name;
      }
      return '';
    }, [players, winner]);

    return (
      <div className="flex justify-center mt-2 flex-col">
        <p className="text-xl text-center">
          {(winner as unknown) === 'tie' ? (
            <span className="font-bold">Tie!</span>
          ) : (
            <>
              <span className="font-bold">{winnerPlayer}</span> won!
            </>
          )}
        </p>
        <Button styleType="yellow" className="my-2" onClick={restart}>
          Restart
        </Button>
      </div>
    );
  }
  return <></>;
};

export default memo(Message);
