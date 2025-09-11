"use client";
import React, { createContext, useContext } from "react";

type Dict = Record<string, any>;
const Ctx = createContext<Dict>({});

export function TranslationProvider({
  dict,
  children,
}: { dict: Dict; children: React.ReactNode }) {
  return <Ctx.Provider value={dict}>{children}</Ctx.Provider>;
}

export function useT<T = any>(): T {
  return useContext(Ctx) as T;
}
