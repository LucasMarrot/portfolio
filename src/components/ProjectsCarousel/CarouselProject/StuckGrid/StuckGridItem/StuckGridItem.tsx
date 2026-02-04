import { memo, useMemo } from "react";
import styles from "./StuckGridItem.module.scss";

type TStuckGridItemProps = {
  item: string;
  index: number;
  progress: number;
};

const StuckGridItem = memo(
  (props: TStuckGridItemProps): JSX.Element => {

    const animationValues = useMemo(() => {
      const translateZ: number = -30 + props.progress * 60;
      const opacity: number =
        props.progress < 0.4 ? 0 : props.progress > 0.85 ? 1 : props.progress;
      const blur: number = (1 - props.progress) * 5;

      return {
        display: props.progress === 1 ? ("none" as const) : ("block" as const),
        filter: `blur(${blur || 4}px)`,
        opacity: opacity || 0,
        transform: `translateZ(${translateZ || -1000}px)`,
      };
    }, [props.progress]);

    return (
      <div
        className={`${styles.gridItem} ${styles[`gridItem${props.index + 1}`]}`}
        style={{
          transform: animationValues.transform,
          opacity: animationValues.opacity,
          filter: animationValues.filter,
          display: animationValues.display,
        }}
      >
        {props.item}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison: only re-render if progress changes significantly
    return Math.abs(prevProps.progress - nextProps.progress) < 0.1;
  }
);

StuckGridItem.displayName = "StuckGridItem";

export default StuckGridItem;
