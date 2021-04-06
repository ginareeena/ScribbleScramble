import React from 'react'
import { EndGameContainer, EndGamePage, EndGameH1 } from './AppCSS'
import { egg } from './Icons'

const NoScribbles = () => {
    return (
        <EndGamePage>
        <EndGameContainer>
            <EndGameH1 style={{ fontSize: "1.8em", fontWeight:"bold", marginBottom: "3rem"}}>No Scrib Scrabbs here.</EndGameH1>
            <a href="/">
            <img
              src={egg}
              style={{ width: "200px"}}
              alt="broken egg"
            />
          </a>
            <EndGameH1 style={{ fontSize: "1.5em", fontWeight:"bold", marginTop: "2.5rem"}}>Go home, you're scrambled!</EndGameH1>
            </EndGameContainer>
            </EndGamePage>
    )
}

export default NoScribbles