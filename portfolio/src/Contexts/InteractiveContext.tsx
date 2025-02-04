import React, { createContext, useContext, useState } from "react";

export enum InteractiveType {
  SPEAK = "speak",
  CLICK = "clickable",
}

type InteractiveState = {
  type: InteractiveType | null;
  text?: string;
};

type InteractiveContextType = {
  interactiveState: InteractiveState;
  setInteractiveState: React.Dispatch<React.SetStateAction<InteractiveState>>;
};

const InteractiveContext = createContext<InteractiveContextType | undefined>(
  undefined
);

export function InteractiveProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [interactiveState, setInteractiveState] = useState<InteractiveState>({
    type: null,
  });

  return (
    <InteractiveContext.Provider
      value={{ interactiveState, setInteractiveState }}
    >
      {children}
    </InteractiveContext.Provider>
  );
}

export const useInteractive = () => {
  const context = useContext(InteractiveContext);
  if (!context) {
    throw new Error(
      "useInteractive must be used within an InteractiveProvider"
    );
  }
  return context;
};
