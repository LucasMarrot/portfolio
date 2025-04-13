import React from "react";
import InteractiveObject from "../../_commons/InteractiveObject/InteractiveObject";
import {
  InteractiveType,
  useInteractive,
} from "../../../contexts/InteractiveContext";
import Lever from "../../Lever/Lever";
import { useScene } from "../../../contexts/SceneContext";
import styles from "./InitScene.module.scss";
import { useStrings } from "../../../customHooks/useStrings";

interface InitSceneProps {
  onComplete: () => void;
}

export default function InitScene({ onComplete }: InitSceneProps): JSX.Element {
  const { sceneState } = useScene();
  const { setInteractiveState } = useInteractive();
  const strings = useStrings();

  React.useEffect(() => {
    if (sceneState === "completed") {
      setInteractiveState({ type: null });
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  }, [sceneState, onComplete, setInteractiveState]);

  return (
    <div className={`${styles.initScene} ${styles[sceneState]}`}>
      {sceneState !== "completed" && (
        <InteractiveObject
          type={InteractiveType.ALL}
          text={strings.leverText}
          className={styles.leverContainer}
        >
          <Lever />
        </InteractiveObject>
      )}
    </div>
  );
}
