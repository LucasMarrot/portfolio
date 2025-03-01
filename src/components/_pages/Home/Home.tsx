import NameInfo from "../../NameInfo/NameInfo";
import Particles from "../../Particles/Particles";
import ThemeToggle from "../../ThemeToggle/ThemeToggle";

export default function Home(): JSX.Element {
  return (
    <main>
      <Particles />
      <NameInfo />
      <ThemeToggle />
    </main>
  );
}
