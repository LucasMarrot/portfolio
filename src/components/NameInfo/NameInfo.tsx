import React from "react";
import styles from "./NameInfo.module.scss";
import InteractiveObject from "../_commons/InteractiveObject/InteractiveObject";
import { InteractiveType } from "../../contexts/InteractiveContext";
import { useStrings } from "../../customHooks/useStrings";

export default function NameInfo(): JSX.Element {
  const [animationCompleted, setAnimationCompleted] = React.useState(false);
  const strings = useStrings();

  React.useEffect(() => {
    const animationDuration: number = 3200;
    const timer: NodeJS.Timeout = setTimeout(() => {
      setAnimationCompleted(true);
    }, animationDuration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <InteractiveObject
      type={InteractiveType.SPEAK}
      text={strings.nameInfo}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      isInteractionEnabled={animationCompleted}
    >
      <div className={styles.titleWrapper}>
        <h1 className={styles.sweetTitle}>
          <span data-text="Lucas">Lucas</span>
          <span data-text="Marrot">Marrot</span>
        </h1>
      </div>
    </InteractiveObject>
  );
}
