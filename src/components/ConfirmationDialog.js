import React from "react";
import "../App.css";

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-dialog-overlay">
      <div className="confirmation-dialog">
        <p>{message}</p>
        <div className="confirmation-dialog-buttons">
          <button onClick={onConfirm} className="confirm-button">
            Yes
          </button>
          <button onClick={onCancel} className="cancel-button">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;