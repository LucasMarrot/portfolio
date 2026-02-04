import React from "react";

const MAX_SCALE_VALUE: number = 16;

export type TRange = {
  start: number;
  end: number;
  length: number;
};

export type TStuckGridItem = {
  word: string;
  index: number;
  progress: number;
};

/**
 * Custom hook to manage StuckGrid animation calculations
 * Extracts: range calculation, sub-progress calculation, and item rendering logic
 */
export const useStuckGrid = (
  scale: number,
  words: readonly string[]
): TStuckGridItem[] => {
  const totalItems: number = words.length;

  const calculateRange = React.useCallback(
    (index: number, totalItems: number): TRange => {
      const overlap: number = 0.1;
      const length: number = Math.round((1 / totalItems) * 100) / 100;
      const start: number = Math.max(0, Math.round(index * length * 100) / 100);
      const end: number = Math.max(0, Math.min(1, start + length + overlap));
      return { start, end, length };
    },
    []
  );

  const getSubProgress = React.useCallback(
    (
      progress: number,
      start: number,
      end: number,
      length: number
    ): number => {
      if (progress < start) return 0;
      if (progress > end) return 1;
      return (progress - start) / length;
    },
    []
  );

  // Memoize the items array to prevent unnecessary re-renders
  const items = React.useMemo(() => {
    const globalProgress: number = scale / MAX_SCALE_VALUE;

    return words.map((word, index) => {
      const range: TRange = calculateRange(index, totalItems);
      const progress: number = getSubProgress(
        globalProgress,
        range.start,
        range.end,
        range.length
      );

      return {
        word,
        index,
        progress,
      };
    });
  }, [scale, words, totalItems, calculateRange, getSubProgress]);

  return items;
};
