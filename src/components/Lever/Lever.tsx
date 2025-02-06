import React, { useState } from "react";
import styles from "./Lever.module.scss";
import { useScene } from "../../contexts/SceneContext";

interface LeverProps {
  initialRotation?: number;
  finalRotation?: number;
}

export default function Lever({
  initialRotation = 30,
  finalRotation = -80,
}: LeverProps): JSX.Element | null {
  const [isPulled, setIsPulled] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const { setSceneState } = useScene();

  React.useEffect(() => {
    if (isExploding) {
      const timeout = setTimeout(() => {
        setIsRemoved(true);
      }, 500); // Duration matches explosion animation

      return () => clearTimeout(timeout);
    }
  }, [isExploding]);

  const handlePull = async () => {
    if (!isPulled) {
      setIsPulled(true);
      setSceneState("earthquake");

      document.body.classList.add("earthquake");
      await new Promise((resolve) => setTimeout(resolve, 3000));
      document.body.classList.remove("earthquake");

      setIsExploding(true);
      setSceneState("explosion");
      await new Promise((resolve) => setTimeout(resolve, 500));

      setSceneState("completed");
    }
  };

  if (isRemoved) return null;

  return (
    <div
      className={`
        ${styles.leverControl} 
        ${isExploding ? styles.exploding : ""}
      `}
      onClick={handlePull}
    >
      <div
        className={`${styles.lever} ${isPulled ? styles.pulled : ""}`}
        style={
          {
            "--initial-rotation": `${initialRotation}deg`,
            "--final-rotation": `${finalRotation}deg`,
          } as React.CSSProperties
        }
      >
        <div className={styles.knob} />
        <div className={styles.stick} />
      </div>
      <div className={styles.leverBase}>
        <div className={styles.pivot} />
        <div className={styles.base} />
      </div>
    </div>
  );
}
