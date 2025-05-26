import React from "react";
import { useModalStack } from "../hooks/useModalStack";
import '../components/Modal/modal.css';

const ModalStack: React.FC = () => {
  const { openModal, renderedModals } = useModalStack();

  const openFirstModal = () => {
    openModal({
      id: "first",
      title: "First Modal",
      children: (
        <div>
          <h4>This is the first modal</h4>
          <button
            onClick={() =>
              openModal({
                id: "second",
                title: "Second Modal",
                children: <p>This is the second stacked modal</p>,
              })
            }
          >
            Open Another Modal
          </button>
        </div>
      ),
    });
  };

  return (
    <div className="modal-page-container">
        <div>
         <h1>Stacked model component</h1>
        </div>
    <div>
        <button
        onClick={openFirstModal}
        className="open-modal-button"
      >
        Open Modal
      </button>
      {renderedModals}
    </div>
    </div>
  );
};

export default ModalStack;