import React from 'react';

import useModalStore from '../store/modal.store';

const useModal = (component: React.ReactElement) => {
  const { setIsOpen, setComponent } = useModalStore();

  return {
    open: () => {
      setComponent(component);
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
      setComponent(null);
    },
  };
};

export default useModal;
