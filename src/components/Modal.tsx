import { FC } from 'react';

import useModalStore from '../store/modal.store';

const Modal: FC = () => {
  const { component, isOpen, setIsOpen } = useModalStore();

  const close = () => {
    setIsOpen(false);
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
        className="modal relative w-1/3 h-auto bg-light-yellow rounded-md p-6"
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
