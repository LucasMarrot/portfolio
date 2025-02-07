import styles from "./Particles.module.scss";

const PARTICLES_NUMBER: number = 200;

export default function Particles() {
  return (
    <div className={styles.particlesContainer}>
      {Array.from({ length: PARTICLES_NUMBER }).map((_, i) => (
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
