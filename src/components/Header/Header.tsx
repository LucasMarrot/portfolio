import NavMenu from "../Nav/NavMenu/NavMenu";
import LanguageToggle from "../Toggles/LanguageToggle/LanguageToggle";
import SoundToggle from "../Toggles/SoundToggle/SoundToggle";
import styles from "./Header.module.scss";

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <div className={styles.navMenu}>
        <NavMenu />
      </div>
      <div className={styles.toggles}>
        {/* <ThemeToggle /> */}
        <SoundToggle />
        <LanguageToggle />
      </div>
    </header>
  );
}
