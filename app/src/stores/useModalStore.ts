import { create } from "zustand";
import { ModalType } from "@utils/modal.util";

type ModalPayload = {
  status: boolean;
  extraParams?: Record<string, any>;
};
export interface ModalStoreState {
  openedModals: Record<ModalType, ModalPayload>;
  openModal: (modalName: ModalType, extraParams?: Record<string, any>) => void;
  closeModal: (modalName: ModalType) => void;
}

export const useModalStore = create<ModalStoreState>()((set) => ({
  openedModals: {
    addNewNodeModal: {
      status: false,
    },
    viewTemplateModal: {
      status: false,
    },
    chartDataEditorModal: {
      status: false,
    },
    dateTimePickerModal: {
      status: false,
    },
  },
  openModal: (modalName: ModalType, extraParams?: Record<string, any>) =>
    set((state) => ({
      ...state,
      openedModals: {
        ...state.openedModals,
        [modalName]: {
          status: true,
          extraParams: extraParams,
        },
      },
    })),
  closeModal: (modalName: ModalType) =>
    set((state) => ({
      ...state,
      openedModals: {
        ...state.openedModals,
        [modalName]: {
          status: false,
          extraParams: {},
        },
      },
    })),
}));
