import { lazy, Suspense } from "react";
import Header from "../../Header/Header";
import NameInfo from "../../NameInfo/NameInfo";

const Particles = lazy(() => import("../../Particles/Particles"));
const Contacts = lazy(() => import("../../Contacts/Contacts"));

export default function Home(): JSX.Element {
  return (
    <main>
      <Suspense fallback={null}>
        <Particles />
      </Suspense>
      <Header />
      <NameInfo />
      <Suspense fallback={null}>
        <Contacts />
      </Suspense>
    </main>
  );
}
