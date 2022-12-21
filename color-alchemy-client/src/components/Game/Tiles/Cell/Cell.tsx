import React, { FC } from "react";
import { cellType, ICell } from "../../../../models/tiles";
import Tile from "../../../../shared/Tile";
import Source from "../Source/Source";
import { gameStatus } from "../../../../models/game";

interface ICellProps {
  cell: ICell;
  gameStatus?: gameStatus;
  onSourceClick: (cellId: string) => void;
  onCellDrop: (e: DragEvent, cellId: string) => void;
}

const Cell: FC<ICellProps> = (props) => {
  switch (props.cell.type) {
    case cellType.Tile:
      return <Tile cell={props.cell} />;
    case cellType.Source:
      return (
        <Source
          cell={props.cell}
          gameStatus={props.gameStatus}
          onSourceClick={props.onSourceClick}
          onCellDrop={props.onCellDrop}
        />
      );
    default:
      return null;
  }
};

export default Cell;
