import React, { createContext, useContext, useState } from "react";

type SceneState =
  | "initial"
  | "earthquake"
  | "explosion"
  | "reveal"
  | "completed";

type SceneContextType = {
  sceneState: SceneState;
  setSceneState: (state: SceneState) => void;
};

const SceneContext = createContext<SceneContextType | undefined>(undefined);

export function SceneProvider({ children }: { children: React.ReactNode }) {
  const [sceneState, setSceneState] = useState<SceneState>("initial");

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", "init");
  }, []);

  React.useEffect(() => {
    if (sceneState === "reveal") {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, [sceneState]);

  return (
    <SceneContext.Provider value={{ sceneState, setSceneState }}>
      {children}
    </SceneContext.Provider>
  );
}

export const useScene = () => {
  const context = useContext(SceneContext);
  if (!context) throw new Error("useScene must be used within SceneProvider");
  return context;
};
