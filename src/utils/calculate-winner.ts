import lines from '../constants/Playground/calculate-winner.constants';
import { Line } from '../typings/Playground/interfaces/calculate-winner.interfaces';
import { Nullish } from '../typings/shared/types/nullish.type';

const calculateWinner = (squares: Array<Nullish<string>>) => {
  let line: Line = lines[0];
  let winner = lines.reduce((memo, iline) => {
    const {
      indexes: [a, b, c],
    } = iline;
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      memo = squares[a] as string;
      line = iline;
    }
    return memo;
  }, '');
  if (!winner && squares.every((s) => s)) {
    winner = 'tie';
  }
  return { winner, line };
};

export default calculateWinner;
