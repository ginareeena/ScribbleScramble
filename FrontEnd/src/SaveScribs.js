import React, {useState, useEffect} from 'react'
// import axios from 'axios'
import { fabric } from "fabric";

const SaveScribs = () => {
    const [scribs, setScribs] = useState("")

    
        // finalImg = value;
        // console.log("finalImg---->", finalImg);
        let finalImag = new Image()
        finalImag.onload = () => {
          return fabric.Image(finalImag, 0, 0);
        }
        // finalImag.src = value
    
    const fetchScribs = () => {
      // fetch(window.location.origin)
      // .then((res) => setScribs(res.data))

    }

    useEffect(() => {
        setScribs()
        console.log('scribs', scribs)
    }, [])

    return (
        <div></div>
    )
}

export default SaveScribs