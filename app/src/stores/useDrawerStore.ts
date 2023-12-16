import { DrawerType } from '@utils/drawer.util';
import { create } from 'zustand';

export interface DrawerStoreState {
  drawerName: DrawerType | undefined;
  extraParams?: Record<string, any>;
  openDrawer: (drawerName: DrawerType, extraParams?: Record<string, any>) => void;
  closeDrawer: () => void;
}

export const useDrawerStore = create<DrawerStoreState>()(set => ({
  drawerName: undefined,
  openDrawer: (drawerName: DrawerType, extraParams?: Record<string, any>) =>
    set(_ => ({ drawerName: drawerName as any, extraParams: extraParams })),
  closeDrawer: () => set(_ => ({ drawerName: undefined, extraParams: {} })),
}));
