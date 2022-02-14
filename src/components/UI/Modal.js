import React from 'react'
import ReactDOM  from 'react-dom';

const BackDrop =()=>{
    return (<div className="backdrop"></div>);
}

const ModalOverlay = (props)=>{
    return (
        <div className="modal">{props.children}</div>
    );
}

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <>
        {ReactDOM.createPortal(<BackDrop/>, portalElement) }
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement) }
    </>
  )
}

export default Modal