import { FC } from 'react';

import useModalStore from '../store/modal.store';

const Modal: FC = () => {
  const { component, isOpen, setIsOpen, onClose } = useModalStore();

  const close = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <div
      onClick={close}
      role="presentation"
      className={`modal-background fixed flex justify-center items-center bg-slate-50 bg-opacity-60 backdrop-blur-sm w-full h-full z-50 transition-all ${
        isOpen ? '' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="presentation"
        className="modal relative sm:w-3/5 md:w-2/3 lg:w-1/3 w-11/12 h-auto bg-light-yellow rounded-md sm:p-6 p-4"
      >
        <button
          onClick={close}
          className="closer -top-4 -right-4 rounded-full bg-black w-8 h-8 absolute flex justify-center items-center"
        >
          ✖
        </button>
        {component}
      </div>
    </div>
  );
};

export default Modal;
