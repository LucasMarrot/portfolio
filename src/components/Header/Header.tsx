import { useLocation } from "react-router-dom";
import NavMenu from "../Nav/NavMenu/NavMenu";
import ThemeToggle from "../Toggles/ThemeToggle/ThemeToggle";
import LanguageToggle from "../Toggles/LanguageToggle/LanguageToggle";
import SoundToggle from "../Toggles/SoundToggle/SoundToggle";
import styles from "./Header.module.scss";

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
          <SoundToggle />
        </div>
      )}
    </header>
  );
}
