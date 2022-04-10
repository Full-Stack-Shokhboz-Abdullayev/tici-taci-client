import React from 'react';
import create from 'zustand';

import { Nullish } from '../typings/shared/types/nullish.type';

interface State {
  isOpen: boolean;
  component: Nullish<React.ReactElement>;
  onClose: Nullish<() => void>;
  onOpen: Nullish<() => void>;
}

interface Actions {
  setIsOpen: (isOpen: boolean) => void;
  setComponent: (component: Nullish<React.ReactElement>) => void;
  setEventHandlers: (handlers: { onClose?: Nullish<() => void> }) => void;
}

type Store = State & Actions;

const useModalStore = create<Store>((set) => ({
  isOpen: false,
  component: null,
  setIsOpen: (isOpen) => {
    set((state) => ({ ...state, isOpen }));
  },
  setComponent: (component) => {
    set((state) => ({ ...state, component }));
  },
  setEventHandlers: (handlers) => {
    set((state) => ({
      ...state,
      onClose: handlers.onClose,
    }));
  },
  onClose: null,
  onOpen: null,
}));

export default useModalStore;
