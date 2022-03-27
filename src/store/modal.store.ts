import React from 'react';
import create from 'zustand';

import { Nullish } from '../typings/shared/types/nullish.type';

interface State {
  isOpen: boolean;
  component: Nullish<React.ReactElement>;
}

interface Actions {
  setIsOpen: (isOpen: boolean) => void;
  setComponent: (component: Nullish<React.ReactElement>) => void;
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
}));

export default useModalStore;
