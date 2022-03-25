import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";

interface Props {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
}

// Implement Modal in Next JS using createPortal | Next JS Modal https://youtu.be/iolkZAg00gk

export const Modal = ({ show, onClose, onConfirm, children }: Props) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const handleCloseClick = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  const handleConfirmClick = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm();
    onClose();
  };

  const modalContent = show ? (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-gray-700  w-1/2 h-1/2 border rounded-md p-12 flex flex-col justify-center items-center space-y-3">
        <div className="text-justify text-red-500">{children}</div>
        <div className="space-x-5">
          <button
            onClick={handleCloseClick}
            className="btn btn-circle btn-outline"
          >
            <AiOutlineClose />
          </button>
          <button
            onClick={handleConfirmClick}
            className="btn btn-circle btn-outline"
          >
            <AiOutlineDelete className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return mounted
    ? createPortal(modalContent, (document as any).getElementById("modal"))
    : null;
};
