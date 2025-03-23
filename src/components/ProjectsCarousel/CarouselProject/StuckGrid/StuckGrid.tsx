import React from "react";
import styles from "./StuckGrid.module.scss";
import StuckGridItem from "./StuckGridItem/StuckGridItem";

type TStuckGridProps = {
  scale: number;
};

type TRange = {
  start: number;
  end: number;
  length: number;
};

export default function StuckGrid({ scale }: TStuckGridProps): JSX.Element {
  const totalItems: number = items.length;

  const calculateRange = (index: number, totalItems: number): TRange => {
    const overlap: number = 0.1;
    const length: number = Math.round((1 / totalItems) * 100) / 100;
    const start: number = Math.max(0, Math.round(index * length * 100) / 100);
    const end: number = Math.max(0, Math.min(1, start + length + overlap));
    return { start, end, length };
  };

  function getSubProgress(
    progress: number,
    start: number,
    end: number,
    length: number
  ): number {
    if (progress < start) return 0;
    if (progress > end) return 1;
    return (progress - start) / length;
  }

  return (
    <div className={styles.stuckGrid}>
      {items.map((item, index) => {
        const MAX_SCALE_VALUE: number = 16;
        const globalProgress: number = scale / MAX_SCALE_VALUE;

        const range: TRange = calculateRange(index, totalItems);

        const progress: number = getSubProgress(
          globalProgress,
          range.start,
          range.end,
          range.length
        );
        return (
          <StuckGridItem
            key={index}
            item={item}
            progress={progress}
            index={index}
          />
        );
      })}
    </div>
  );
}

const items = [
  "oklch()",
  "scroll()",
  "text-box-trim",
  "pow()",
  "@property",
  "top-layer",
  "@view-transition",
  "var()",
  "clamp()",
  "view()",
  "oklch()",
  "scroll()",
  "text-box-trim",
  "pow()",
  "@property",
  "top-layer",
  "@view-transition",
  "var()",
  "clamp()",
  "view()",
  "oklch()",
  "scroll()",
  "text-box-trim",
  "pow()",
  "@property",
  "top-layer",
  "@view-transition",
  "var()",
  "clamp()",
  "view()",
];
