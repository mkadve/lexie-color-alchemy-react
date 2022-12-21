export const enum cellType {
    Empty,
    Tile,
    Source,
  }
  
  export interface ICell {
    id: string;
    color: number[];
    borderColor: number[];
    type: cellType;
    isDnDEnabled: boolean;
  }
  