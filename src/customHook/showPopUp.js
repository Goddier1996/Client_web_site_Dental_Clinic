import { useState } from "react";

  
// here open pop up models , why there are many useState , we have in one component one more models and we create this useState.
export const ShowModelPopUp = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showOneMoreModel, setShowOneMoreModel] = useState(false);
    const handleCloseOneMoreModel = () => setShowOneMoreModel(false);
    const handleShowOneMoreModel = () => setShowOneMoreModel(true);

    return {
        show, handleClose, handleShow
        , showOneMoreModel, handleCloseOneMoreModel, handleShowOneMoreModel
    };
}