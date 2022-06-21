import { FC } from 'react';

import { PlayersState } from '../../typings/Playground/interfaces/index.interfaces';
import { Nullish } from '../../typings/shared/types/nullish.type';
import Loading from '../core/design/Loading';

const Fallback: FC<{
  players: Partial<PlayersState>;
  xIsNext: boolean;
  canMove: boolean;
  winner: Nullish<string>;
}> = ({ players, xIsNext, winner, canMove }) => {
  return !players.remote ||
    ((players.local?.sign === 'O' ? xIsNext : !xIsNext) && !winner) ||
    !canMove ? (
    <div className="flex justify-center items-center absolute w-full h-full z-30 bac bg-opacity-80 bg-white">
      <Loading show={true} />
    </div>
  ) : (
    <></>
  );
};

export default Fallback;
