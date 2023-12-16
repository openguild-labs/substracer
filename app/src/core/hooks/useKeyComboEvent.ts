import { useEffect } from 'react';

type CallbackFn = (keyDown: boolean) => void;
type KeyEventCondition = (key: KeyboardEvent) => boolean;

export const useKeyComboEvent = (
  keyEvents: KeyEventCondition[],
  callbacks: CallbackFn[],
  disabled?: boolean
) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      console.log(e.key);
      if (disabled) return;
      let eventIndex = 0;
      for (const keyEvent of keyEvents) {
        if (keyEvent(e)) {
          callbacks[eventIndex](true);
        }
        eventIndex++;
      }
    };
    const onKeyUp = (e: any) => {
      if (disabled) return;
      let eventIndex = 0;
      for (const keyEvent of keyEvents) {
        if (keyEvent(e)) {
          callbacks[eventIndex](false);
        }
        eventIndex++;
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [keyEvents, callbacks, disabled]);
};
