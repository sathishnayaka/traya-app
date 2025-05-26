import React from "react";
import { useModalStack } from "../hooks/useModalStack";
import '../components/Modal/modal.css';

const ModalStack: React.FC = () => {
  const { openModal, renderedModals } = useModalStack();

  const openFirstModal = () => {
    openModal({
      id: "first",
      title: "User Profile",
      children: (
        <div>
          <h4>This is the first modal (User Profile)</h4>
          <p>Name: John Doe</p>
          <p>Email: john.doe@example.com</p>
          <button
            className="open-modal-button"
            onClick={() =>
              openModal({
                id: "second",
                title: "Edit Preferences",
                children: (
                  <div>
                    <h4>Second Modal - Edit Preferences</h4>
                    <p>Theme: Dark Mode</p>
                    <p>Notifications: Enabled</p>
                    <button
                      className="open-modal-button"
                      onClick={() =>
                        openModal({
                          id: "third",
                          title: "Security Settings",
                          children: (
                            <div>
                              <h4>Third Modal - Security Settings</h4>
                              <p>2FA: Enabled</p>
                              <p>Password Last Changed: 2 months ago</p>
                              <button
                                className="open-modal-button"
                                onClick={() =>
                                  openModal({
                                    id: "fourth",
                                    title: "Confirm Changes",
                                    children: (
                                      <div>
                                        <h4>Final Modal - Confirm Changes</h4>
                                        <p>Please confirm your updated settings before saving.</p>
                                        <button className="open-modal-button">Confirm</button>
                                      </div>
                                    ),
                                  })
                                }
                              >
                                Proceed to Confirmation
                              </button>
                            </div>
                          ),
                        })
                      }
                    >
                      Go to Security Settings
                    </button>
                  </div>
                ),
              })
            }
          >
            Edit Preferences
          </button>
        </div>
      ),
    });
  };

  return (
    <div className="modal-page-container">
      <div>
        <h1>Stacked Modal Component</h1>
      </div>
      <div>
        <button onClick={openFirstModal} className="open-modal-button">
          Open Modal
        </button>
        {renderedModals}
      </div>
    </div>
  );
};

export default ModalStack;