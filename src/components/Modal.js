import React, { useEffect, useRef } from "react";
import { useDialogState, Dialog, DialogBackdrop, DialogDisclosure } from "reakit/Dialog";
import { IconX } from "tabler-icons";

export function Modal({ linkText, modalLabel, children }) {
  const dialog = useDialogState();
  const initialFocusRef = useRef();

  useEffect(() => {
    if (dialog.visible) {
      initialFocusRef.current.focus();
    }
  }, [dialog.visible]);

  const closeModal = () => {
    dialog.hide();
  };

  return (
    <>
      <DialogDisclosure {...dialog} className="noBtn">
        {linkText}
      </DialogDisclosure>
      <DialogBackdrop
        {...dialog}
        className="bg-black flex items-center justify-center fixed bottom-0 left-0 w-screen h-screen bg-opacity-50"
        style={{ zIndex: 1000 }}
      >
        <Dialog {...dialog} aria-label={modalLabel} className="bg-white p-8 relative" style={{ minWidth: "50%" }}>
          <div className="flex justify-end absolute top-0 right-0">
            <button className="noBtn w-auto m-2" onClick={closeModal}>
              <IconX />
            </button>
          </div>
          {dialog.visible && children(closeModal, initialFocusRef)}
        </Dialog>
      </DialogBackdrop>
    </>
  );
}
