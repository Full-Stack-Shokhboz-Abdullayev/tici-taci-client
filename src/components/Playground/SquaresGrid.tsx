import { FC } from 'react';

import { Line } from '../../typings/Playground/interfaces/calculate-winner.interfaces';
import { Nullish } from '../../typings/shared/types/nullish.type';
import Square from './Square';

const SquaresGrid: FC<{
  squares: Nullish<string>[];
  line: Partial<Line['line']>;
  onClick: (i: number) => void;
}> = ({ squares, onClick, line }) => {
  return (
    <div
      className={`playground-content relative grid grid-cols-3 grid-rows-3 line-${line.perspective} line-${line.position}`}
    >
      {squares.map((value, i) => (
        <Square value={value} onClick={onClick} index={i} key={i} />
      ))}
    </div>
  );
};

export default SquaresGrid;
