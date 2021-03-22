import styled, {css} from 'styled-components'
import { BrowserRouter as Router, Link } from "react-router-dom";

export const StyledLink = styled(Link)`
    color: darkgrey;
    font-weight: bold;
`
export const Button = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid darkgrey;
    align: center;
    color: black;
    margin: 0 1em;
    padding: 0.25em 1em;
`
export const Title = styled.h1`
    font-size: 2em;
    text-align: center;
    color: darkgrey;
`

export const PlayArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const StyledCanvas = styled.canvas`
    width: 450px;
    margin: auto;
    border: 3px outset black;
    border-radius: 3px;
`