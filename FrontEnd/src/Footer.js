import React, { useState } from "react";
import Routes from "./Routes";
import { Body, FooterStyle, Title3, MasterScramblers } from "./AppCSS";
import { cotton, crab, whale, firefly } from './Icons'

function Footer() {

  
    return (
        <div>
        <FooterStyle>
        <MasterScramblers>
            <a href="/">
              <img src={crab} />
            </a>
            <Title3>Meghan McFarland</Title3>
            </MasterScramblers>
            <MasterScramblers>
            <a href="/">
              <img src={cotton} />
            </a> 
            <Title3>Kristen Studioso</Title3>
            </MasterScramblers>
            <MasterScramblers>
            <a href="/">
              <img src={whale} />
            </a>
            <Title3>Gina Moffit</Title3>
            </MasterScramblers>
            <MasterScramblers>
            <a href="/">
              <img src={firefly} />
            </a>
            <Title3>Kelsey Greene</Title3>
            </MasterScramblers>
        </FooterStyle>
        
        </div>
      
    );
  }
  
  export default Footer;
  
