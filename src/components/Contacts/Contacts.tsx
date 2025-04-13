import { useStrings } from "../../customHooks/useStrings";
import { ProjectLink } from "../ProjectsCarousel/CarouselProject/ProjectLink/ProjectLink";
import styles from "./Contacts.module.scss";

export default function Contacts(): JSX.Element {
  const strings = useStrings();

  return (
    <div className={styles.contacts}>
      <ProjectLink
        type={"github"}
        text={strings.visitMyGithub}
        link={"https://github.com/LucasMarrot"}
      />
      <ProjectLink
        type={"linkedin"}
        text={strings.visitMyLinkedin}
        link={"https://www.linkedin.com/in/lucas-marrot/"}
      />
    </div>
  );
}
