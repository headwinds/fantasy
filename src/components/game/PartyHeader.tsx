import React from "react"
import styled from "styled-components"

import archerPath from "./ff_archer.png"; 
import clericPath from "./ff_cleric.png"; 
import magePath from "./ff_mage.png"; 
import warriorPath from "./ff_warrior.png"; 

export default function PartyHeader() {
    return (
        <div style={{ display: "flex" }}>
          <div><img src={magePath} width="50" alt="mage" /></div>
          <div><img src={clericPath} width="50" alt="mage" /></div>
          <div><img src={archerPath} width="50" alt="mage" /></div>
          <div><img src={warriorPath} width="50" alt="mage" /></div>
        </div>
    )
}