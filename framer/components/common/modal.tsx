import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
//import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";

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
    // <div className="bg-slate-500 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-30">
    //   <div className="bg-primary px-16 py-14 rounded-md text-center m-20">
    <div className="">
      <div>
        <h1 className="text-xl mb-4 font-bold text-info">{children}</h1>
        <button
          onClick={handleCloseClick}
          className="bg-indigo-500 px-4 py-2 rounded-md text-md text-white"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirmClick}
          className="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
        >
          Ok
        </button>
      </div>
    </div>
  ) : null;

  return mounted
    ? createPortal(modalContent, (document as any).getElementById("modal"))
    : null;
};
