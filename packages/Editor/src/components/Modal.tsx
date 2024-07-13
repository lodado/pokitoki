import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Modal 컴포넌트
const Modal = ({ isOpen, onClose, children }: any) => {
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}
    >
      <div
        style={{
          padding: 20,
          background: '#fff',
          borderRadius: '5px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {children}
        <button type="button" onClick={onClose} style={{ marginTop: 20 }}>
          Close
        </button>
      </div>
    </div>,
    document.body,
  )
}

export default Modal
