import { useSound } from "../../../contexts/SoundContext";
import InteractiveObject from "../../_commons/InteractiveObject/InteractiveObject";
import { InteractiveType } from "../../../contexts/InteractiveContext";
import { useStrings } from "../../../customHooks/useStrings";
import styles from "./SoundToggle.module.scss";

export default function SoundToggle(): JSX.Element {
  const { isSoundEnabled, toggleSound } = useSound();
  const strings = useStrings();

  return (
    <InteractiveObject type={InteractiveType.ALL} text={strings.musicCredit}>
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
