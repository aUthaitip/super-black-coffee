"use client";

import { useCallback, useEffect, useState, type SetStateAction } from "react";
import type { CartItem } from "./types";
import {
  cartStorageKey,
  readStoredCart,
  writeStoredCart,
} from "./cart-storage";

export function usePersistedCart(
  userId: string | undefined,
  initialized: boolean,
) {
  const key = initialized && userId ? cartStorageKey(userId) : null;
  const [state, setState] = useState<{ key: string | null; items: CartItem[] }>(
    { key: null, items: [] },
  );

  useEffect(() => {
    setState({ key, items: readStoredCart(key) });
  }, [key]);

  useEffect(() => {
    // Never save the initial empty state over a cart that has not hydrated yet.
    if (key && state.key === key) writeStoredCart(key, state.items);
  }, [key, state]);

  const setCart = useCallback(
    (update: SetStateAction<CartItem[]>) => {
      setState((previous) => {
        const current =
          previous.key === key ? previous.items : readStoredCart(key);
        return {
          key,
          items: typeof update === "function" ? update(current) : update,
        };
      });
    },
    [key],
  );

  return [state.key === key ? state.items : [], setCart] as const;
}
