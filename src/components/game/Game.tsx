import React from "react";
import styled from "styled-components";

const StyleGridComp = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 50px);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
`;

const StyleCellComp = styled.div`
  grid-area: 1 / 1 / 2 / 2;
`;

export default function Game() {
    return (
        <StyleGridComp>
            <div style={{display: "block", width: 50, height: 50, backgroundColor: "blue", margin: 5}}>A</div>
            <div style={{display: "block", width: 50, height: 50, backgroundColor: "blue", margin: 5}}>A</div>
            <div style={{display: "block", width: 50, height: 50, backgroundColor: "blue", margin: 5}}>A</div>
            <div style={{display: "block", width: 50, height: 50, backgroundColor: "blue", margin: 5}}>A</div>
            <div style={{display: "block", width: 50, height: 50, backgroundColor: "blue", margin: 5}}>A</div>
            <div style={{display: "block", width: 50, height: 50, backgroundColor: "blue", margin: 5}}>A</div>
        </StyleGridComp>
    )
}