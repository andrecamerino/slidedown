"use client";

import { createContext, useContext, useState } from "react";

type ConversionContextType = {
  hasOutput: boolean;
  setHasOutput: (v: boolean) => void;
};

const ConversionContext = createContext<ConversionContextType>({
  hasOutput: false,
  setHasOutput: () => {},
});

export const useConversion = () => useContext(ConversionContext);

export function ConversionProvider({ children }: { children: React.ReactNode }) {
  const [hasOutput, setHasOutput] = useState(false);
  return (
    <ConversionContext.Provider value={{ hasOutput, setHasOutput }}>
      {children}
    </ConversionContext.Provider>
  );
}
