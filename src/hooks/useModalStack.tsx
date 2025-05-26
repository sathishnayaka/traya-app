import React , { useState } from "react";
import { Modal, ModalProps } from "../components/Modal/Modal";

export const useModalStack = () => {
  const [modals, setModals] = useState<ModalProps[]>([]);

  const openModal = (modal: Omit<ModalProps, "onClose">) => {
    setModals((prev) => [
      ...prev,
      {
        ...modal,
        onClose: () => closeModal(modal.id),
      },
    ]);
  };

  const closeModal = (id: string) => {
    setModals((prev) => prev.filter((m) => m.id !== id));
  };

  const renderedModals = modals.map((modal) => (
    <Modal key={modal.id} {...modal} />
  ));

  return { openModal, closeModal, renderedModals };
};