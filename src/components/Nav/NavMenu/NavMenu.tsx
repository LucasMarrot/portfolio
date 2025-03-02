import React from "react";
import NavButton from "../NavButton/NavButton";
import styles from "./NavMenu.module.scss";
import { useStrings } from "../../../customHooks/useStrings";

const NavMenu = (): JSX.Element => {
  const strings = useStrings();
  //TODO: Faire le style

  return (
    <ul className={styles.shadowButtonSet}>
      <NavButton label={strings.nav.home} path="/" />
      <NavButton label={strings.nav.projects} path="/projects" />
      <NavButton label={strings.nav.playground} path="/playground" />
    </ul>
  );
};

export default NavMenu;
