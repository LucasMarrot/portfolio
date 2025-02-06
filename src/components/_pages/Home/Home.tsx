import { useStrings } from "../../../customHooks/useStrings";
import Particles from "../../Particles/Particles";

export default function Home() {
  const strings = useStrings();

  return (
    <main>
      <Particles />
      <h1>{strings.title}</h1>
    </main>
  );
}
