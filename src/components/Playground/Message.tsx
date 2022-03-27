import { FC, useMemo } from 'react';

import { PlayersState } from '../../typings/Playground/interfaces/index.interfaces';
import { PlayerType } from '../../typings/Playground/types/player.type';
import { Nullish } from '../../typings/shared/types/nullish.type';
import Button from '../design/Button';

interface MessageProps {
  winner: Nullish<string>;
  restart: () => void;
  players: Partial<PlayersState>;
}

const findKeyBySign = (players: PlayersState, value: string) => {
  return Object.keys(players).find((key) => players[key as PlayerType].sign === value);
};

const Message: FC<MessageProps> = ({ winner, restart, players }) => {
  if (winner) {
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
          {(winner as unknown) === 'tie' ? 'Tie!' : winnerPlayer + ' won!'}
        </p>
        <Button styleType="yellow" className="my-2" onClick={restart}>
          Restart
        </Button>
      </div>
    );
  }
  return <></>;
};

export default Message;
