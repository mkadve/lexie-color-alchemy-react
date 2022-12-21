import { FC } from "react";
import styled from "styled-components";
import { DEFAULT_BORDER_COLOR, IData } from "../../../models/game";
import { cellType, ICell } from "../../../models/tiles";
import Tile from "../../../shared/Tile";

interface IInfo {
    data: IData,
    delta:number
}

const Info: FC<IInfo> = (props) => {
  const targetCell: ICell = {
    id: "0",
    color: props.data.initial?.target || [0, 0, 0],
    borderColor: DEFAULT_BORDER_COLOR,
    type: cellType.Empty,
    isDnDEnabled: false,
  };

  const closestCell: ICell = {
    id: "1",
    color: props.data.game?.closestColor || [0, 0, 0],
    borderColor: DEFAULT_BORDER_COLOR,
    type: cellType.Empty,
    isDnDEnabled: false,
  };
  
    return (
        <SInfoBox>
          <SRow>
            <h3>RGB Alchemy</h3>
          </SRow>
          <SRow>User ID: {props.data.initial?.userId}</SRow>
          <SRow>
            Moves left:{" "}
            {(props.data.initial?.maxMoves as number) -
              (props.data.game?.stepCount as number)}
          </SRow>
          <SFlexRow>
            Target color &nbsp; <Tile cell={targetCell} />
          </SFlexRow>
          <SFlexRow>
            Closest color &nbsp; <Tile cell={closestCell} />
            &nbsp;Δ=
            {props.delta.toFixed(2)}%
          </SFlexRow>
        </SInfoBox>
      );
}

export default Info;

const SInfoBox = styled.div`
  margin: 20px;
  top:15%;
  left:50%;
  transform:translate(-50%,-50%);
  position:absolute;
`;

const SRow = styled.div`
  margin-bottom: 15px;
`;

const SFlexRow = styled.div`
  display: flex;
  align-items: center;
  line-height: 44px;
  margin-bottom: 10px;
`;