import React, { Component } from 'react'
import './App.css'
import { StateChart } from './xstate-viz'
// import { Machine, StateNode, MachineOptions, assign } from "xstate"
import styled from 'styled-components'
import { myMachine } from './machine'
// This import is not supported
// import logo from "./logo.svg"
// Looks like a codesandbox issue. The following works locally
import logo from "./github.svg"//'require("./github.svg")'

const StyledApp = styled.main`
  height: 100%;
  display: grid;
  grid-template-areas:
    'header'
    'content';
  grid-template-rows: 3rem auto;
  grid-template-columns: 100%;
`

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  grid-area: header;
  padding: 0.5rem 1rem;
`

const StyledLogo = styled.img`
  height: 100%;
`

const StyledLinks = styled.nav`
  display: flex;
  flex-direction: row;
  margin-left: auto;

  &,
  &:visited {
  }
`

const StyledLink = styled.a`
  text-decoration: none;
  color: #57b0ea;
  text-transform: uppercase;
  display: block;
  font-size: 75%;
  font-weight: bold;
  margin: 0 0.25rem;
`

class Header extends Component {
  render() {
    return (
      <StyledHeader>
        <StyledLogo src={logo} />
        <div style={{ opacity: 0 }}>
          <StyledLinks>
            <StyledLink
              href="https://github.com/davidkpiano/xstate"
              target="_xstate-github"
            >
              GitHub
            </StyledLink>
            <StyledLink href="https://xstate.js.org/docs" target="_xstate-docs">
              Docs
            </StyledLink>
            <StyledLink
              href="https://spectrum.chat/statecharts"
              target="_statecharts-community"
            >
              Community
            </StyledLink>
          </StyledLinks>
        </div>
      </StyledHeader>
    )
  }
}

class App extends Component {
  render() {
    return (
      <StyledApp>
        <Header />
        <StateChart machine={myMachine} />
      </StyledApp>
    )
  }
}

export default App
