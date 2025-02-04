import React, { useState } from "react";
import styles from "./Lever.module.scss";

interface LeverProps {
  onPull?: () => void;
  initialRotation?: number;
  finalRotation?: number;
}

export default function Lever({
  onPull,
  initialRotation = 30,
  finalRotation = -80,
}: LeverProps): JSX.Element {
  const [isPulled, setIsPulled] = useState(false);

  const handlePull = () => {
    if (!isPulled) {
      setIsPulled(true);
      onPull?.();
    }
  };

  return (
    <div className={styles.leverControl} onClick={handlePull}>
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
