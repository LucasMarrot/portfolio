import NameInfo from "../../NameInfo/NameInfo";
import NavMenu from "../../Nav/NavMenu/NavMenu";
import Particles from "../../Particles/Particles";
import ThemeToggle from "../../ThemeToggle/ThemeToggle";

export default function Home(): JSX.Element {
  return (
    <main>
      <Particles />
      <ThemeToggle />
      <NavMenu />
      <NameInfo />
    </main>
  );
}
