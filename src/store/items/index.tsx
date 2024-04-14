import { createContext } from "react";

export const ItemsContext = createContext({
  items: [] as any[],
  updateItems: (items: any[]) => {},
});

export const ItemsContextProvider = ItemsContext.Provider;
