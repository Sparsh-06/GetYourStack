import React from "react";

const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800 p-4 rounded-lg w-1/3">
        {children}
      </div>
    </div>
  );
};

export default Modal;
