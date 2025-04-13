import { useLanguage } from "../../../contexts/LanguageContext";
import styles from "./LanguageToggle.module.scss";
import InteractiveObject from "../../_commons/InteractiveObject/InteractiveObject";
import { InteractiveType } from "../../../contexts/InteractiveContext";

export default function LanguageToggle(): JSX.Element {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  return (
    <InteractiveObject type={InteractiveType.CLICK}>
      <button
        onClick={toggleLanguage}
        className={styles.languageToggle}
        aria-label="Toggle language"
      >
        {language === "en" ? "FR" : "EN"}
      </button>
    </InteractiveObject>
  );
}
