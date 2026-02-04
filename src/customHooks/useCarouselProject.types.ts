/**
 * Types for useCarouselProject hook
 * All properties are readonly to enforce immutability
 */

export type TUseCarouselProjectReturn = {
  readonly scale: number;
  readonly contentBoxRef: React.RefObject<HTMLDivElement>;
  readonly leftBoxRef: React.RefObject<HTMLDivElement>;
  readonly rightBoxRef: React.RefObject<HTMLDivElement>;
  readonly animationTransform: string;
  readonly animationOpacity: number;
  readonly isTriggerScroll: boolean;
};

export type TUseCarouselProjectProps = {
  readonly onIsTriggerScrollChange?: (isTriggerScroll: boolean) => void;
}