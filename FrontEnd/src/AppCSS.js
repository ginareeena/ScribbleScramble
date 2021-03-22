import styled, {css} from 'styled-components'
import { BrowserRouter as Router, Link } from "react-router-dom";

export const Body = styled.div`
    display: flex;
    flex-flow: column wrap;
    width: 100%;
    background: #7c8483;
`
    
export const Header = styled.header`
    background: #71a2b6;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70px;
    border-radius: 20px;
`

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
    color: #982649;
`
export const Title2 = styled.h2`
    font-size: 2em;
    text-align: center;
    color: white;
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
    z-index: 2; 
`
export const CanvasBackground = styled.div`
    display: flex;
    width: 800px;
    border-radius: 3px; 
    background: white;
    z-index: 1
`