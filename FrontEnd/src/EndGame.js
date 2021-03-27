import React, { useState } from 'react'
import Routes from "./Routes";
import { LandingPage, Paragraph, DownloadBtn } from "./AppCSS"

const EndGame = () => {
    const [finalImage, setFinalImage] = useState("")

    const handleDownloadBtn = () => {
        console.log('clicked download')
        //grab image json data from local storage
        //send json data to dataURL method with type jpeg

    }

    return (
        <LandingPage>
            <Paragraph>Want to save this collab?</Paragraph>
            <DownloadBtn onClick={() => handleDownloadBtn()}>Download</DownloadBtn>
        </LandingPage>
    )
}

export default EndGame