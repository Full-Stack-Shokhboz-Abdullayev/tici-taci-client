import { FC, memo } from 'react';

import O from '../../assets/images/o.svg';
import X from '../../assets/images/x.svg';
import { Nullish } from '../../typings/shared/types/nullish.type';

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
      className={`grid-item xsm:w-32 xsm:h-32 h-20 w-20 sm:w-40 sm:h-40 flex justify-center items-center border-2 text-xl`}
    >
      {value && <img className="w-1/2 h-1/2" src={value === 'X' ? X : O} alt={value} />}
    </div>
  );
};

export default memo(Square);
