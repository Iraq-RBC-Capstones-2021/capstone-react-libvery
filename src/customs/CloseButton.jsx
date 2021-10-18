import React from "react";
import { useHistory } from "react-router-dom";

function CloseButton({
  isContactModalOpen,
  setIsContactModalOpen,
  setIsEditBookOpen,
  isEditBookOpen,
  isEditImageOpen,
  setIsEditImageOpen,
  isAddBookModalOpen,
  setIsAddBookModalOpen,
}) {
  const history = useHistory();

  function handleClose() {
    if (isEditBookOpen) {
      setIsEditBookOpen(false);
      history.goBack();
    } else if (isContactModalOpen) {
      setIsContactModalOpen(false);
      history.goBack();
    } else if (isEditImageOpen) {
      setIsEditImageOpen(false);
      history.goBack();
    } else if (isAddBookModalOpen) {
      setIsAddBookModalOpen(false);
    }
  }

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8  rounded-lg absolute top-0 right-0 cursor-pointer  m-2"
        viewBox="0 0 20 20"
        fill="#F2E1D9"
        onClick={handleClose}
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

export default CloseButton;
