import { createPortal } from "react-dom";
import './Alert.css'

const Alert = () => {
  return createPortal(
    <div className="alert">
        <div className="alert-message">
        The player is Cristiano Ronaldo
        </div>
    </div>,
    document.getElementById("alert-portal")
  );
};

export default Alert;
