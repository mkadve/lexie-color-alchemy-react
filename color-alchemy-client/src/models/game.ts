import { IFetchedData } from "./fetchedData";

export const INITIAL_STEPS_NUMBER = 3;
export const DEFAULT_BORDER_COLOR = [200, 200, 200];
export const CLOSEST_COLOR_BORDER = [255, 0, 0];
export const DEFAULT_CELL_ID_WITH_CLOSEST_COLOR = "1,1";
export const DEFAULT_DELTA = 100;
export const DELTA_WIN_CONDITION = 10;

export const enum gameStatus {
  Initial,
  InGame,
  Finished,
}

export interface IGameData {
  closestColor: number[];
  status: gameStatus;
  stepCount: number;
  nextColor: number[]; // To paint Source
  isDnDEnabled: boolean;
}

export interface IData {
  initial?: IFetchedData;
  game?: IGameData;
}
