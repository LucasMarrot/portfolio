import Header from "../../Header/Header";
import NameInfo from "../../NameInfo/NameInfo";
import Particles from "../../Particles/Particles";

export default function Home(): JSX.Element {
  return (
    <main>
      <Particles />
      <Header />
      <NameInfo />
    </main>
  );
}
