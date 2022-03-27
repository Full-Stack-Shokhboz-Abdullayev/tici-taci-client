import { Perspective } from '../../typings/Playground/enums/perspective.enum';
import { Line } from '../../typings/Playground/interfaces/calculate-winner.interfaces';

const lines: Line[] = [
  { indexes: [0, 1, 2], line: { perspective: Perspective.HORIZONTAL, position: '1' } },
  { indexes: [3, 4, 5], line: { perspective: Perspective.HORIZONTAL, position: '2' } },
  { indexes: [6, 7, 8], line: { perspective: Perspective.HORIZONTAL, position: '3' } },
  { indexes: [0, 3, 6], line: { perspective: Perspective.VERTICAL, position: '1' } },
  { indexes: [1, 4, 7], line: { perspective: Perspective.VERTICAL, position: '2' } },
  { indexes: [2, 5, 8], line: { perspective: Perspective.VERTICAL, position: '3' } },
  { indexes: [0, 4, 8], line: { perspective: Perspective.DIOGANAL, position: 'left' } },
  {
    indexes: [2, 4, 6],
    line: { perspective: Perspective.DIOGANAL, position: 'right' },
  },
];
export default lines;
