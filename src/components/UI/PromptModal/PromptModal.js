import React from 'react'

import './PromptModal.css'

const PromptModal = (props) => {
  return (
    <div className='prompt-modal'>{props.children}</div>
  )
}

export default PromptModal