import styles from "./StuckGridItem.module.scss";

type TStuckGridItemProps = {
  item: string;
  index: number;
  progress: number;
};

export default function StuckGridItem(props: TStuckGridItemProps): JSX.Element {
  const translateZ: number = -30 + props.progress * 60;
  const opacity: number =
    props.progress < 0.4 ? 0 : props.progress > 0.85 ? 1 : props.progress;
  const blur: number = (1 - props.progress) * 5;

  const animationDisplay: string = props.progress === 1 ? "none" : "block";
  const animationFilter: string = `blur(${blur || 4}px)`;
  const animationOpacity: number = opacity || 0;
  const animationTransform: string = `translateZ(${translateZ || -1000}px)`;

  return (
    <div
      key={props.index}
      className={`${styles.gridItem} ${styles[`gridItem${props.index + 1}`]}`}
      style={{
        transform: animationTransform,
        opacity: animationOpacity,
        filter: animationFilter,
        display: animationDisplay,
      }}
    >
      {props.item}
    </div>
  );
}
