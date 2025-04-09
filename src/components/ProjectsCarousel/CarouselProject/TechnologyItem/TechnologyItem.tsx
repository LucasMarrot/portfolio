import { getTechnologiesLogo, TTechnologyNames } from "./TechnologyItem.utils";
import styles from "./TechnologyItem.module.scss";

type TTechnologyItemProps = {
  name: TTechnologyNames;
};

export const TechnologyItem = ({ name }: TTechnologyItemProps): JSX.Element => {
  return (
    <div className={styles.technologyItem}>
      <div
        dangerouslySetInnerHTML={{
          __html: getTechnologiesLogo(name),
        }}
        className={styles.logo}
      />
      <h3>{name}</h3>
    </div>
  );
};
