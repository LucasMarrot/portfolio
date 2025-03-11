import NavButton from "../NavButton/NavButton";
import styles from "./NavMenu.module.scss";
import { useStrings } from "../../../customHooks/useStrings";

const NavMenu = (): JSX.Element => {
  const strings = useStrings();

  return (
    <ul className={styles.shadowButtonSet}>
      <NavButton label={strings.nav.home} path="/" />
      <NavButton label={strings.nav.projects} path="/projects" />
    </ul>
  );
};

export default NavMenu;
