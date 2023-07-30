import { useState } from 'react';
import ReactDOM from 'react-dom';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    setIsOpen,
  };
};

export const Modal = ({
  description,
  children,
}: {
  description: string;
  children: React.ReactNode;
}) => {
  const modal = (
    <div className="fixed inset-0 h-screen w-screen bg-gray-900 bg-opacity-60">
      <dialog
        role="dialog"
        aria-label={description}
        open
        className="fixed left-0 top-[40%] z-40 mt-8 block bg-transparent"
      >
        <div className="relative mx-auto w-96 max-w-lg rounded-2xl bg-white p-6 shadow-lg">
          <main className="py-3 text-lg text-black/50">{children}</main>
        </div>
      </dialog>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
};
