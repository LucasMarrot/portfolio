import { useSound } from "../../../contexts/SoundContext";
import InteractiveObject from "../../_commons/InteractiveObject/InteractiveObject";
import { InteractiveType } from "../../../contexts/InteractiveContext";
import styles from "./SoundToggle.module.scss";

export default function SoundToggle(): JSX.Element {
  const { isSoundEnabled, toggleSound } = useSound();

  return (
    <InteractiveObject type={InteractiveType.CLICK}>
      <button
        onClick={toggleSound}
        className={styles.soundToggle}
        aria-label="Toggle sound"
      >
        {isSoundEnabled ? "🔊" : "🔇"}
      </button>
    </InteractiveObject>
  );
}
