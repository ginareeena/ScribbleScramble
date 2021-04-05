import React, { useState, useEffect } from "react";

const EndGameButton = ({onClick, scribs}) => 
<button onClick={() => handleEndGame()} type="button">
{scribs}
</button>

export default EndGameButton