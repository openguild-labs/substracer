import { useMemo } from 'react';
import { CanvasLayerInfo } from '..';
import { useCanvasStore } from '@stores/useCanvasStore';

export function useLayerConfig<T = any>(layer: CanvasLayerInfo<any, T>) {
  const { updateLayerConfig } = useCanvasStore();
  const config = useMemo<T>(() => layer.extra as any, [layer]);

  const handleUpdateConfig = (field: keyof T, value: any) => {
    updateLayerConfig<T>(layer.id, field, value);
  };
  return { config, handleUpdateConfig };
}
