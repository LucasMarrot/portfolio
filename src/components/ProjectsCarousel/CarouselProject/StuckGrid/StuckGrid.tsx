import styles from "./StuckGrid.module.scss";
import StuckGridItem from "./StuckGridItem/StuckGridItem";
import { useStuckGrid } from "../../../../customHooks/useStuckGrid";

type TStuckGridProps = {
  readonly scale: number;
  readonly words: readonly string[];
};

export default function StuckGrid({
  scale,
  words,
}: TStuckGridProps): JSX.Element {
  const items = useStuckGrid(scale, words);

  return (
    <div className={styles.stuckGrid}>
      {items.map((item) => (
        <StuckGridItem
          key={item.index}
          item={item.word}
          progress={item.progress}
          index={item.index}
        />
      ))}
    </div>
  );
}
