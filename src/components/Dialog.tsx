import React from "react";
import "./Dialog.css";

export default function Dialog({ isOpen, onClose, title, children }:any) {
  if (!isOpen) return null; // Don't render anything if the dialog is closed

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        {/* <div className="dialog-header">
          <h2>{title}</h2>
          
        </div> */}
        <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        <div className="dialog-content">
          {children}
        </div>
        
      </div>
    </div>
  );
}
