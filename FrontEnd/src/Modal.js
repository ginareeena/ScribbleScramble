import React, { useState, useEffect } from "react"
// import Modal from "styled-react-modal"
import { StyledModal } from "./AppCSS"

const ModalComp = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    const timer = () => {
        setTimeout(toggleModal, 10000)
        console.log('timer has run')
    }

    useEffect(() => {
        toggleModal()
    }, [])

    return (
        <div>

            <StyledModal
                isOpen={isOpen}
                onLoad={timer()}
            >Game starts in 10 seconds!</StyledModal>
        </div>
    )
}

export default ModalComp