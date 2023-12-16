import { CanvasActionId } from "@constants/canvasActionList";
import { create } from "zustand";
import { CanvasLayerId, CanvasLayerInfo } from "../core/models/canvas-type";

export interface CanvasStoreState {
  fullScreenMode: boolean;
  verticalLineRef: React.MutableRefObject<HTMLDivElement | null> | undefined;
  horizontalLineRef: React.MutableRefObject<HTMLDivElement | null> | undefined;
  selectedAction: CanvasActionId;
  selectedLayers: Record<CanvasLayerId, boolean>;
  layerIdsInOrder: CanvasLayerId[];
  hiddenLayers: Record<CanvasLayerId, boolean>;
  layers: Record<CanvasLayerId, CanvasLayerInfo>;
  preview: boolean;
  toggleFullScreenMode: () => void;
  selectAction: (actionId: CanvasActionId) => void;
  selectLayer: (layerId: CanvasLayerId) => void;
  updateLayerIdsInOrder: (values: CanvasLayerId[]) => void;
  updateLayer: <T = any, E = any>(
    layerId: CanvasLayerId,
    values: Partial<CanvasLayerInfo<T, E>>
  ) => Partial<CanvasLayerInfo<T, E>>;
  toggleHiddenLayer: (layerId: CanvasLayerId) => void;
  updateLayerConfig: <ConfigType = any>(
    layerId: CanvasLayerId,
    field: keyof ConfigType,
    value: any
  ) => void;
  setLayers: (layers: Record<CanvasLayerId, CanvasLayerInfo>) => void;
  addNewLayer: <T = any, E = any>(
    layerId: CanvasLayerId,
    defaultValues: CanvasLayerInfo<T, E>
  ) => CanvasLayerInfo<T, E>;
  setPreviewMode: (preview: boolean) => void;
  resetCanvas: () => void;
  setVerticalLineRef: (
    ref: React.MutableRefObject<HTMLDivElement | null> | undefined
  ) => void;
  setHorizontalLineRef: (
    ref: React.MutableRefObject<HTMLDivElement | null> | undefined
  ) => void;
}

const DEFAULT_CANVAS_DATA = {
  fullScreenMode: false,
  layerIdsInOrder: [],
  layers: {},
  selectedLayers: {},
  hiddenLayers: {},
  preview: false,
};

export const useCanvasStore = create<CanvasStoreState>()((set) => ({
  ...DEFAULT_CANVAS_DATA,
  selectedAction: "component-action",
  horizontalLineRef: undefined,
  verticalLineRef: undefined,
  setHorizontalLineRef(ref) {
    set((state) => ({ ...state, horizontalLineRef: ref }));
  },
  setVerticalLineRef(ref) {
    set((state) => ({ ...state, verticalLineRef: ref }));
  },
  toggleFullScreenMode() {
    set((state) => ({ ...state, fullScreenMode: !state.fullScreenMode }));
  },
  setPreviewMode(preview) {
    set((state) => ({ ...state, preview }));
  },
  setLayers(layers) {
    set((state) => ({ ...state, layers }));
  },
  selectAction(actionId) {
    set((state) => ({ ...state, selectedAction: actionId }));
  },
  toggleHiddenLayer(layerId) {
    set((state) => ({
      ...state,
      hiddenLayers: {
        ...state.hiddenLayers,
        [layerId]: !state.hiddenLayers[layerId],
      },
    }));
  },
  updateLayerIdsInOrder(values) {
    set((state) => ({
      ...state,
      layerIdsInOrder: values,
    }));
  },
  selectLayer(layerId) {
    set((state) => ({
      ...state,
      selectedLayers: {
        [layerId]: true,
      },
    }));
  },
  updateLayer(layerId, values) {
    set((state) => ({
      ...state,
      layers: {
        ...state.layers,
        [layerId]: {
          ...state.layers[layerId],
          ...values,
        },
      },
    }));
    return values;
  },
  addNewLayer(layerId, defaultValues) {
    set((state) => ({
      ...state,
      selectedLayers: {
        [layerId]: true,
      },
      layerIdsInOrder: [
        state.layerIdsInOrder[0],
        layerId,
        ...state.layerIdsInOrder.slice(1),
      ],
      layers: {
        ...state.layers,
        [layerId]: {
          ...defaultValues,
        },
      },
    }));
    return defaultValues;
  },
  updateLayerConfig(layerId, field, value) {
    set((state) => ({
      ...state,
      layers: {
        ...state.layers,
        [layerId]: {
          ...state.layers[layerId],
          extra: {
            ...state.layers[layerId]?.extra,
            [field]: value,
          },
        },
      },
    }));
  },
  resetCanvas() {
    set((state) => ({
      ...state,
      ...DEFAULT_CANVAS_DATA,
    }));
  },
}));
