import React from "react";
import styles from "./NameInfo.module.scss";
import InteractiveObject from "../_commons/InteractiveObject/InteractiveObject";
import { InteractiveType } from "../../contexts/InteractiveContext";

export default function NameInfo(): JSX.Element {
  return (
    <InteractiveObject
      type={InteractiveType.SPEAK}
      text="Ouaw, il a le nom d'un beau gosse !"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
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
