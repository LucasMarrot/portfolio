import React, { createContext, useContext, RefObject } from "react";

type CursorContextType = {
  circleRef: RefObject<HTMLDivElement>;
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({
  children,
  circleRef,
}: {
  children: React.ReactNode;
  circleRef: RefObject<HTMLDivElement>;
}) {
  return (
    <CursorContext.Provider value={{ circleRef }}>
      {children}
    </CursorContext.Provider>
  );
}

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
};
