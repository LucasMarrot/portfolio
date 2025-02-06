import styles from "./Particles.module.scss";

export default function Particles() {
  return (
    <div className={styles.particlesContainer}>
      {Array.from({ length: 200 }).map((_, i) => (
        <div
          key={i}
          className={`${styles.circleContainer} ${styles[`particle-${i + 1}`]}`}
        >
          <div className={styles.circle} />
        </div>
      ))}
    </div>
  );
}
