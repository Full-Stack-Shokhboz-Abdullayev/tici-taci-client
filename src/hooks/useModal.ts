import React from 'react';

import useModalStore from '../store/modal.store';
import { Nullish } from '../typings/shared/types/nullish.type';

const useModal = (
  component: React.ReactElement,
  handlers?: {
    onClose?: Nullish<() => void>;
  },
) => {
  const { setIsOpen, setComponent, setEventHandlers } = useModalStore();
  return {
    open: () => {
      setComponent(component);
      if (handlers) {
        setEventHandlers(handlers);
      }
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
      setEventHandlers({
        onClose: null,
      });
      setComponent(null);
    },
  };
};

export default useModal;
