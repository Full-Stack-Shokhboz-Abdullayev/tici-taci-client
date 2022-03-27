import { Perspective } from '../enums/perspective.enum';

export interface Line {
  indexes: Array<number>;
  line: {
    perspective: Perspective;
    position?: string;
  };
}
