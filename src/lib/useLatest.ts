import { useEffect, useRef } from 'react';

/**
 * A ref that always holds the newest value, updated after each render.
 * Lets a long-lived listener (like a keydown handler) read fresh state without
 * being re-attached, and without writing to a ref during render.
 */
export function useLatest<T>(value: T) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref;
}
