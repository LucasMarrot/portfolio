import { useTheme } from "../../../contexts/ThemeProvider";
import styles from "./ThemeToggle.module.scss";
import InteractiveObject from "../../_commons/InteractiveObject/InteractiveObject";
import { InteractiveType } from "../../../contexts/InteractiveContext";

export default function ThemeToggle(): JSX.Element {
  const { theme, toggleTheme } = useTheme();

  return (
    <InteractiveObject type={InteractiveType.CLICK}>
      <button
        onClick={toggleTheme}
        className={styles.themeToggle}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </InteractiveObject>
  );
}
