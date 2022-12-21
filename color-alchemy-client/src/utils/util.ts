import { IFetchedData } from "../models/fetchedData";
import { cellType, ICell } from "../models/tiles";
import { DEFAULT_BORDER_COLOR, IData } from "../models/game";

export const enum sourcePosition {
  Top,
  Right,
  Bottom,
  Left,
}

export const generateInitialField = (initialData: IFetchedData): ICell[][] => {
  const initialField: ICell[][] = [];
  const h = initialData.height;
  const w = initialData.width;
  let type: cellType;

  if (h === 0 || w === 0) {
    // not initialized
    return [];
  }

  for (let y = 0; y < h + 2; y++) {
    // + 2 - to add source circles
    initialField[y] = [];

    for (let x = 0; x < w + 2; x++) {
      // + 2 - to add source circles
      if (x === 0 || y === 0 || x > w || y > h) {
        // Find empty corner Sources
        if (
          (x === 0 && y === 0) ||
          (x === 0 && y === h + 1) ||
          (x === w + 1 && y === 0) ||
          (x === w + 1 && y === h + 1)
        ) {
          type = cellType.Empty;
        } else {
          type = cellType.Source;
        }
      } else {
        type = cellType.Tile;
      }

      let cell: ICell = {
        id: x + "," + y,
        color: [0, 0, 0],
        borderColor: DEFAULT_BORDER_COLOR,
        type: type,
        isDnDEnabled: false,
      };

      initialField[y][x] = cell;
    }
  }

  return initialField;
};

export const getXFromCellId = (cellId: string) => {
  const coords = cellId.split(",");
  return Number(coords[0]);
};

export const getYFromCellId = (cellId: string) => {
  const coords = cellId.split(",");
  return Number(coords[1]);
};

export const getSourcePosition = (sourceCellId: string, data: IData) => {
  const sourceX = getXFromCellId(sourceCellId);
  const sourceY = getYFromCellId(sourceCellId);
  let position;

  if (sourceX === 0) {
    position = sourcePosition.Left;
  } else if (sourceX === (data.initial?.width as number) + 1) {
    position = sourcePosition.Right;
  } else if (sourceY === 0) {
    position = sourcePosition.Top;
  } else {
    position = sourcePosition.Bottom;
  }

  return position;
};

export const getCalculatedTileColor = (
  color: number[],
  distance: number,
  dimension: number
): number[] => {
  const k = (dimension + 1 - distance) / (dimension + 1);

  return color.map((colorComponent) => colorComponent * k);
};

export const getFieldWithUpdatedTilesLine = (
  data: IData,
  sourceCellId: string,
  updatedField: ICell[][]
) => {
  const sourceX = getXFromCellId(sourceCellId);
  const sourceY = getYFromCellId(sourceCellId);
  const targetSourcePosition = getSourcePosition(sourceCellId, data);
  const height = data.initial?.height as number;
  const width = data.initial?.width as number;

  switch (targetSourcePosition) {
    case sourcePosition.Top:
      for (let currentCellY = 1; currentCellY <= height; currentCellY++) {
        const currentCellX = sourceX;
        paintMixedColorCells(
          updatedField,
          currentCellX,
          currentCellY,
          height,
          width
        );
      }
      break;
    case sourcePosition.Right:
      for (let currentCellX = width; currentCellX > 0; currentCellX--) {
        const currentCellY = sourceY;
        paintMixedColorCells(
          updatedField,
          currentCellX,
          currentCellY,
          height,
          width
        );
      }
      break;
    case sourcePosition.Bottom:
      for (let currentCellY = height; currentCellY > 0; currentCellY--) {
        const currentCellX = sourceX;
        paintMixedColorCells(
          updatedField,
          currentCellX,
          currentCellY,
          height,
          width
        );
      }
      break;
    case sourcePosition.Left:
    default:
      for (let currentCellX = 0; currentCellX <= width; currentCellX++) {
        const currentCellY = sourceY;
        paintMixedColorCells(
          updatedField,
          currentCellX,
          currentCellY,
          height,
          width
        );
      }
  }

  return updatedField;
};

const paintMixedColorCells = (
  updatedField: ICell[][],
  currentCellX: number,
  currentCellY: number,
  height: number,
  width: number
) => {
  let currentCellColorList = [];
console.log('currentCellX',currentCellX,currentCellY)
  // Iterate by 4 Sources, that affect to the current cell color
  for (let position = 0; position < 4; position++) {
    let sourceColor;

    switch (position) {
      case sourcePosition.Top:
        sourceColor = getColorByCoord(
          updatedField,
          currentCellX,
          currentCellY,
          position
        );

        currentCellColorList.push(
          getCalculatedTileColor(sourceColor, currentCellY, height)
        );
        break;
      case sourcePosition.Right:
        sourceColor = getColorByCoord(
          updatedField,
          currentCellX,
          currentCellY,
          position
        );

        currentCellColorList.push(
          getCalculatedTileColor(sourceColor, width - currentCellX + 1, width)
        );
        break;
      case sourcePosition.Bottom:
        sourceColor = getColorByCoord(
          updatedField,
          currentCellX,
          currentCellY,
          position
        );

        currentCellColorList.push(
          getCalculatedTileColor(sourceColor, height - currentCellY + 1, height)
        );
        break;
      case sourcePosition.Left:
      default:
        sourceColor = getColorByCoord(
          updatedField,
          currentCellX,
          currentCellY,
          position
        );

        currentCellColorList.push(
          getCalculatedTileColor(sourceColor, currentCellX, width)
        );
        break;
    }
  }

  //calculation of the colors where f is a normalization factor to make sure that all RGB elements of the resulting color does not exceed 255.

  let r = 0;
  let g = 0;
  let b = 0;

  for (let i = 0; i < currentCellColorList.length; i++) {
    r += currentCellColorList[i][0];
    g += currentCellColorList[i][1];
    b += currentCellColorList[i][2];
  }

  const f = 255 / Math.max(r, g, b, 255);
  const cellMixedColor = [r * f, g * f, b * f];

  updatedField[currentCellY][currentCellX] = {
    ...updatedField[currentCellY][currentCellX],
    color: cellMixedColor,
  };
};

export const getCellColorById = (field: ICell[][], cellId: string) => {
  const x = getXFromCellId(cellId);
  const y = getYFromCellId(cellId);

  return field[y][x].color;
};

export const getColorByCoord = (
  updatedField: ICell[][],
  currentCellX: number,
  currentCellY: number,
  position: number
) => {
  let fullLineLength;
  switch (position) {
    case sourcePosition.Top:
      return updatedField[0][currentCellX].color;
    case sourcePosition.Bottom:
      fullLineLength = updatedField.length - 1;
      return updatedField[fullLineLength][currentCellX].color;
    case sourcePosition.Right:
      fullLineLength = updatedField[currentCellY].length - 1;
      return updatedField[currentCellY][fullLineLength].color;
    case sourcePosition.Left:
    default:
      return updatedField[currentCellY][0].color;
  }
};
