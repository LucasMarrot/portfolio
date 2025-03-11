import { useLocation } from "react-router-dom";
import NavMenu from "../Nav/NavMenu/NavMenu";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import styles from "./Header.module.scss";
import LanguageToggle from "../LanguageToggle/LanguageToggle";

export default function Header(): JSX.Element {
  const location = useLocation();
  const isHome: boolean = location.pathname === "/";

  return (
    <header className={styles.header}>
      <div className={styles.navMenu}>
        <NavMenu />
      </div>
      {isHome && (
        <div className={styles.toggles}>
          <ThemeToggle />
          <LanguageToggle />
        </div>
      )}
    </header>
  );
}
