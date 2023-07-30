import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export const useAlert = () => {
  const [alertDialog, setAlertDialog] = useState({
    isOpen: false,
    message: '',
  });

  useEffect(() => {
    if (alertDialog.isOpen) {
      const timer = setTimeout(() => {
        setAlertDialog({ isOpen: false, message: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertDialog]);

  return {
    alertDialog,
    setAlertDialog,
  };
};

interface AlertProps {
  message: string;
}

export const Alert = ({ message }: AlertProps) => {
  const dialog = (
    <dialog
      open
      role="alert"
      className="fixed left-0 top-0 z-50 mt-8 block bg-transparent"
    >
      <div className="relative mx-auto w-96 max-w-lg rounded bg-white shadow-lg">
        <header className="rounded-t bg-red-500 px-4 py-2 font-bold text-white">
          Error
        </header>
        <main className="rounded-b border border-t-0 border-red-400 bg-red-100 px-4 py-3 text-red-700">
          <p>{message}</p>
        </main>
      </div>
    </dialog>
  );

  return ReactDOM.createPortal(dialog, document.body);
};
