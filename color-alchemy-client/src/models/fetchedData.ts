export const INIT_URL = "http://localhost:9876/init";

export interface IFetchedData {
  userId: string;
  width: number;
  height: number;
  maxMoves: number;
  target: number[];
}
