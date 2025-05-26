import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import "./modal.css";

let modalRoot = document.getElementById("modal-root");
if (!modalRoot) {
  modalRoot = document.createElement("div");
  modalRoot.id = "modal-root";
  document.body.appendChild(modalRoot);
}

export interface ModalProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.85, y: -50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 30,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
};

export const Modal: React.FC<ModalProps> = ({ id, title, children, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 500, height: 300 });
  const isResizing = useRef(false);

  const offset = [...id].reduce((acc, char) => acc + char.charCodeAt(0), 0) % 40;

  useEffect(() => {
    const previouslyFocusedElement = document.activeElement as HTMLElement;
    modalRef.current?.focus();
    return () => previouslyFocusedElement?.focus();
  }, []);

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      setSize({
        width: startWidth + (e.clientX - startX),
        height: startHeight + (e.clientY - startY),
      });
    };

    const onMouseUp = () => {
      isResizing.current = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return createPortal(
    <AnimatePresence>
      <>
        <motion.div
          key="backdrop"
          className="modal-backdrop"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onClick={onClose}
        />
        <motion.div
          key="modal"
          className="modal-container"
          style={{
            width: size.width,
            height: size.height,
            transform: `translate(-50%, -50%) translate(${offset}px, ${offset}px)`
          }}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          ref={modalRef}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2 className="modal-title">{title}</h2>
            <button className="modal-close" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-content">{children}</div>
          <div
            onMouseDown={startResize}
            className="modal-resizer"
          />
        </motion.div>
      </>
    </AnimatePresence>,
    modalRoot
  );
};