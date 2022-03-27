import { FC, memo } from 'react';

import O from '../assets/images/o.svg';
import X from '../assets/images/x.svg';
import { Nullish } from '../typings/shared/types/nullish.type';

interface SquareProps {
  value: Nullish<string>;
  onClick: (i: number) => void;
  index: number;
}

const Square: FC<SquareProps> = ({ value, onClick, index }) => {
  return (
    <div
      onClick={() => onClick(index)}
      onKeyDown={() => onClick(index)}
      role="presentation"
      className={`grid-item w-40 h-40 flex justify-center items-center border-2 text-xl`}
    >
      {value && (
        <img className="w-20 h-20 " src={value === 'X' ? X : O} alt="tic-tac-toe-icon" />
      )}
    </div>
  );
};

export default memo(Square);
