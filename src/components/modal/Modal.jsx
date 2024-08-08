import ReactDOM from "react-dom";
import {
  StyledModalOverlay,
  StyledModalContent,
  StyledCloseButton,
} from "./modal.styled";

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <StyledModalOverlay onClick={onClose}>
      <StyledModalContent
        onClick={(e) => e.stopPropagation()}
        style={{ overflow: "hidden" }}
      >
        <StyledCloseButton onClick={onClose}>×</StyledCloseButton>
        {children}
      </StyledModalContent>
    </StyledModalOverlay>,
    document.body
  );
};

export default Modal;
