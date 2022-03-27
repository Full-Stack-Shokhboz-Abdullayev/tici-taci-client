/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ReducerAction {
  type: string;
  payload?: {
    [key: string]: any;
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */
