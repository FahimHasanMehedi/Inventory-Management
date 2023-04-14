import React, { useContext } from 'react'
import ModalContext from '../../../store/modal-context'

import './Backdrop.css'

const Backdrop = (props) => {
    const modalCtx = useContext(ModalContext);

  return (
    <div className='backdrop' style={{zIndex: props.zIndex}} onClick={props.onClick}></div>
  )
}

export default Backdrop