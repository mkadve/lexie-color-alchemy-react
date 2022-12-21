import { FC } from "react";
import styled from "styled-components";
import { IData } from "../../../models/game";
import { ICell } from "../../../models/tiles";
import Cell from "./Cell/Cell";


interface IFieldProps {
  data: IData;
  field: ICell[][];
  onSourceClick: (cellId: string) => void;
  onCellDrop: (e: DragEvent, cellId: string) => void;
}

const Tiles: FC<IFieldProps> = (props) => {
  return (
    (typeof props.data.initial?.width !== "undefined" && (
      <SGridContainer
        $columnsNumber={
          props.data.initial.width > 0 ? props.data.initial.width + 2 : 0
        }
      >
        {Array.isArray(props.field) &&
          props.field.map((row) => {
            return row.map((cell) => {
              return (
                <SGridItem key={cell.id}>
                  <Cell
                    cell={cell}
                    gameStatus={props.data.game?.status}
                    onSourceClick={props.onSourceClick}
                    onCellDrop={props.onCellDrop}
                  />
                </SGridItem>
              );
            });
          })}
      </SGridContainer>
    )) ||
    null
  );
};

export default Tiles;

const SGridContainer = styled.div<{ $columnsNumber: number }>`
  margin: 0 20px;
  display: inline-grid;
  ${(props): string => {
    return `
      grid-template-columns: repeat(${props.$columnsNumber}, 1fr);
    `;
  }};
  gap: 1px;
  top:60%;
  left:50%;
  transform:translate(-50%,-50%);
  position:absolute;
`;

const SGridItem = styled.div`
  width: 28px;
  height: 28px;
`;
