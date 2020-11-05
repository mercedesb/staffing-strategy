import React from "react";
import { useDialogState, Dialog, DialogBackdrop, DialogDisclosure } from "reakit/Dialog";
import { IconX } from "tabler-icons";

export function Modal({ linkText, modalLabel, children }) {
  const dialog = useDialogState();

  return (
    <>
      <DialogDisclosure {...dialog} className="noBtn">
        {linkText}
      </DialogDisclosure>
      <DialogBackdrop
        {...dialog}
        className="bg-black flex items-center justify-center absolute top-0 left-0 w-screen h-screen bg-opacity-50"
        style={{ zIndex: 100 }}
      >
        <Dialog {...dialog} aria-label={modalLabel} className="bg-white p-8 relative">
          <div className="flex justify-end absolute top-0 right-0">
            <button className="noBtn w-auto m-2" onClick={() => dialog.hide()}>
              <IconX />
            </button>
          </div>
          {children}
        </Dialog>
      </DialogBackdrop>
    </>
  );
}
