import React, { FC } from "react";
import styled from "styled-components";
import { gameStatus } from "../../../../models/game";
import { ICell } from "../../../../models/tiles";

interface ISourceProps {
  cell: ICell;
  gameStatus?: gameStatus;
  onSourceClick: (cellId: string) => void;
  onCellDrop: (e: DragEvent, cellId: string) => void;
}

const Source: FC<ISourceProps> = (props) => {
  const handleSourceClick = () => {
    props.onSourceClick(props.cell.id);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    props.onCellDrop(e, props.cell.id);
  };

  let additionalProps = {};
  if (props.cell.isDnDEnabled) {
    additionalProps = {
      onDragOver: handleDragOver,
      onDrop: handleDrop,
    };
  }

  return (
    <SSource
      {...additionalProps}
      $color={props.cell.color}
      $clickable={props.gameStatus === gameStatus.Initial}
      onClick={handleSourceClick}
    />
  );
};

export default Source;

interface ISSource {
  $color?: number[];
  $clickable?: boolean;
}

const SSource = styled.div`
  display: inline-block;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid rgb(200, 200, 200);
  margin: 1px;
  ${(props: ISSource): string => {
    return `
      background-color: rgb(${props.$color?.[0] || 0}, ${
      props.$color?.[1] || 0
    }, ${props.$color?.[2] || 0});
    `;
  }};
  ${(props: ISSource): string => {
    return props.$clickable ? "cursor: pointer;" : "";
  }}
`;
